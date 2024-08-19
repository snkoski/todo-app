```bash 
/opt/homebrew/opt/postgresql@14/bin/postgres -D /opt/homebrew/var/postgresql@14
```

```sql
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS recipe_steps;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipe_ingredients;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    author VARCHAR(100),
    image_url TEXT,
    source_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the recipe_steps table
CREATE TABLE recipe_steps (
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (recipe_id, step_number)
);

-- Create the measurements table
CREATE TABLE measurements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the ingredients table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the recipe_ingredients table
CREATE TABLE recipe_ingredients (
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(id) ON DELETE CASCADE,
    measurement_id INT REFERENCES measurements(id) ON DELETE CASCADE,
    quantity NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (recipe_id, ingredient_id, measurement_id)
);

-- Modify the todos table to include user_id
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    done BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the function to update the modified_at column
CREATE OR REPLACE FUNCTION update_modified_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the triggers for updating modified_at
CREATE TRIGGER set_modified_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

CREATE TRIGGER set_modified_at_recipes
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

CREATE TRIGGER set_modified_at_todos
BEFORE UPDATE ON todos
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

CREATE TRIGGER set_modified_at_recipe_steps
BEFORE UPDATE ON recipe_steps
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

CREATE TRIGGER set_modified_at_measurements
BEFORE UPDATE ON measurements
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

CREATE TRIGGER set_modified_at_ingredients
BEFORE UPDATE ON ingredients
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

CREATE TRIGGER set_modified_at_recipe_ingredients
BEFORE UPDATE ON recipe_ingredients
FOR EACH ROW
EXECUTE FUNCTION update_modified_at();

-- Insert sample user
INSERT INTO users (username, email, password)
VALUES ('testuser', 'testuser@example.com', 'password123');

-- Insert sample recipes
INSERT INTO recipes (name, description, author, image_url, source_url)
VALUES
('Spaghetti Carbonara', 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.', 'John Doe', 'https://example.com/spaghetti.jpg', 'https://example.com/spaghetti-recipe'),
('Chicken Tikka Masala', 'A popular Indian curry dish made with marinated chicken in a spiced tomato sauce.', 'Jane Smith', 'https://example.com/chickentikka.jpg', 'https://example.com/chickentikka-recipe'),
('Vegetable Stir Fry', 'A quick and healthy stir-fry made with a mix of fresh vegetables and soy sauce.', 'Alice Johnson', 'https://example.com/veggiestirfry.jpg', 'https://example.com/veggiestirfry-recipe'),
('Beef Tacos', 'Delicious beef tacos with seasoned ground beef, fresh toppings, and soft tortillas.', 'Michael Brown', 'https://example.com/beeftacos.jpg', 'https://example.com/beeftacos-recipe'),
('Chocolate Chip Cookies', 'Classic chocolate chip cookies that are crispy on the outside and chewy on the inside.', 'Emily Davis', 'https://example.com/chocchipcookies.jpg', 'https://example.com/chocchipcookies-recipe');

-- Insert sample recipe steps
DO $$
DECLARE
    r_id INT;
    step_counter INT;
BEGIN
    FOR r_id IN 1..5 LOOP
        FOR step_counter IN 1..5 LOOP
            INSERT INTO recipe_steps (recipe_id, step_number, content)
            VALUES (r_id, step_counter, 'This is step ' || step_counter || ' for recipe ' || r_id);
        END LOOP;
    END LOOP;
END $$;

-- Insert sample ingredients
DO $$
DECLARE
    ingredient_counter INT;
BEGIN
    FOR ingredient_counter IN 1..30 LOOP
        INSERT INTO ingredients (name)
        VALUES ('Ingredient ' || ingredient_counter);
    END LOOP;
END $$;

-- Insert sample measurements
DO $$
DECLARE
    measurement_counter INT;
    measurements_arr TEXT[] := ARRAY['teaspoon', 'tablespoon', 'cup', 'ounce', 'pint', 'quart', 'gallon', 'gram', 'kilogram', 'liter'];
BEGIN
    FOR measurement_counter IN 1..ARRAY_LENGTH(measurements_arr, 1) LOOP
        INSERT INTO measurements (name)
        VALUES (measurements_arr[measurement_counter]);
    END LOOP;
END $$;

-- Insert sample recipe ingredients
DO $$
DECLARE
    r_id INT;
    ingredient_counter INT;
BEGIN
    ingredient_counter := 1;
    FOR r_id IN 1..5 LOOP
        FOR i IN 1..6 LOOP
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, measurement_id, quantity)
            VALUES (r_id, ingredient_counter, i, (i * 2)::NUMERIC);
            ingredient_counter := ingredient_counter + 1;
        END LOOP;
    END LOOP;
END $$;

-- Insert sample todos
INSERT INTO todos (title, description, done, deleted, user_id)
VALUES 
('Buy groceries', 'Need to buy milk, eggs, and bread', FALSE, FALSE, 1),
('Clean the house', 'Vacuum, dust, and mop the floors', FALSE, FALSE, 1),
('Finish project report', 'Complete the final report for the project', TRUE, FALSE, 1),
('Workout', 'Go for a run and do strength training', FALSE, FALSE, 1),
('Read a book', 'Read 50 pages of a novel', FALSE, FALSE, 1);

```

#Prisma CLI Commands
Inititialize Prisma (Create prisma folder and initial schema.prisma)
 ```bash
 bunx prisma init --datasource-provider postgresql
 ```

Pull tables from already created db
 ```bash
 bunx prisma db pull
 ```

