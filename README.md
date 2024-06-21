```bash 
/opt/homebrew/opt/postgresql@14/bin/postgres -D /opt/homebrew/var/postgresql@14
```

CREATE USER shawn WITH PASSWORD 'password';
CREATE DATABASE db;
GRANT ALL PRIVILEGES ON DATABASE db TO shawn;

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    steps TEXT NOT NULL,
    prep_time INT, -- Time required to prepare ingredients, in minutes
    cook_time INT, -- Time required to cook the recipe, in minutes
    total_time INT GENERATED ALWAYS AS (prep_time + cook_time) STORED, -- Total time, in minutes
    servings INT, -- Number of servings
    difficulty VARCHAR(50), -- Difficulty level (easy, medium, hard)
    author VARCHAR(100), -- Author of the recipe
    category VARCHAR(50), -- Recipe category (e.g., appetizer, main course)
    cuisine VARCHAR(50), -- Cuisine type (e.g., Italian, Mexican)
    tags TEXT, -- Tags associated with the recipe (e.g., vegetarian, gluten-free)
    image_url TEXT, -- URL to an image of the prepared dish
    source_url TEXT, -- URL to the source of the recipe
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a function to update the date_modified column
CREATE OR REPLACE FUNCTION update_date_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before an update
CREATE TRIGGER set_date_modified
BEFORE UPDATE ON recipe
FOR EACH ROW
EXECUTE FUNCTION update_date_modified();

-- Insert sample recipes into the recipe table
INSERT INTO recipe (name, description, ingredients, steps, prep_time, cook_time, servings, difficulty, author, category, cuisine, tags, image_url, source_url)
VALUES
-- Recipe 1
(
    'Spaghetti Carbonara',
    'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    '200g spaghetti, 100g pancetta, 2 large eggs, 50g Pecorino cheese, 50g Parmesan, fresh black pepper, salt, 1 clove garlic, 1 tbsp olive oil',
    '1. Cook the spaghetti. 2. Fry the pancetta with garlic. 3. Beat the eggs and mix with cheese. 4. Combine spaghetti with pancetta and egg mixture. 5. Season with pepper and serve.',
    10,
    20,
    4,
    'Easy',
    'John Doe',
    'Main Course',
    'Italian',
    'pasta, quick, traditional',
    'https://example.com/spaghetti.jpg',
    'https://example.com/spaghetti-recipe'
),
-- Recipe 2
(
    'Chicken Tikka Masala',
    'A popular Indian curry dish made with marinated chicken in a spiced tomato sauce.',
    '500g chicken breast, 1 cup yogurt, 2 tbsp garam masala, 1 tbsp turmeric, 1 tbsp cumin, 1 tbsp coriander, 1 tsp chili powder, 1 onion, 3 cloves garlic, 1 inch ginger, 400g canned tomatoes, 200ml cream, salt, cilantro',
    '1. Marinate the chicken with yogurt and spices. 2. Cook the chicken. 3. Prepare the sauce with onion, garlic, ginger, and tomatoes. 4. Combine chicken with the sauce and simmer. 5. Stir in cream and garnish with cilantro.',
    15,
    30,
    4,
    'Medium',
    'Jane Smith',
    'Main Course',
    'Indian',
    'curry, spicy, creamy',
    'https://example.com/chickentikka.jpg',
    'https://example.com/chickentikka-recipe'
),
-- Recipe 3
(
    'Vegetable Stir Fry',
    'A quick and healthy stir-fry made with a mix of fresh vegetables and soy sauce.',
    '1 red bell pepper, 1 yellow bell pepper, 1 carrot, 1 broccoli, 1 cup snap peas, 2 tbsp soy sauce, 1 tbsp sesame oil, 2 cloves garlic, 1 inch ginger, 1 tbsp cornstarch, 1/2 cup water, salt, pepper, sesame seeds',
    '1. Prepare the vegetables. 2. Stir-fry garlic and ginger. 3. Add vegetables and cook until tender. 4. Mix soy sauce, sesame oil, cornstarch, and water. 5. Pour sauce over vegetables and cook until thickened. 6. Season and garnish with sesame seeds.',
    10,
    15,
    2,
    'Easy',
    'Alice Johnson',
    'Main Course',
    'Asian',
    'vegetarian, quick, healthy',
    'https://example.com/veggiestirfry.jpg',
    'https://example.com/veggiestirfry-recipe'
),
-- Recipe 4
(
    'Beef Tacos',
    'Delicious beef tacos with seasoned ground beef, fresh toppings, and soft tortillas.',
    '500g ground beef, 1 onion, 2 cloves garlic, 1 packet taco seasoning, 8 soft tortillas, 1 cup shredded lettuce, 1 cup diced tomatoes, 1/2 cup shredded cheese, 1/2 cup sour cream, salsa',
    '1. Cook ground beef with onion and garlic. 2. Add taco seasoning and cook thoroughly. 3. Warm the tortillas. 4. Assemble tacos with beef, lettuce, tomatoes, cheese, sour cream, and salsa.',
    10,
    15,
    4,
    'Easy',
    'Michael Brown',
    'Main Course',
    'Mexican',
    'tacos, beef, easy',
    'https://example.com/beeftacos.jpg',
    'https://example.com/beeftacos-recipe'
),
-- Recipe 5
(
    'Chocolate Chip Cookies',
    'Classic chocolate chip cookies that are crispy on the outside and chewy on the inside.',
    '1 cup butter, 1 cup white sugar, 1 cup brown sugar, 2 eggs, 2 tsp vanilla extract, 3 cups all-purpose flour, 1 tsp baking soda, 1/2 tsp baking powder, 1/2 tsp salt, 2 cups chocolate chips',
    '1. Preheat oven to 350°F (175°C). 2. Cream together butter and sugars. 3. Beat in eggs and vanilla. 4. Combine flour, baking soda, baking powder, and salt. 5. Gradually add to the wet mixture. 6. Stir in chocolate chips. 7. Drop by spoonfuls onto baking sheets and bake for 10 minutes.',
    15,
    10,
    24,
    'Easy',
    'Emily Davis',
    'Dessert',
    'American',
    'cookies, dessert, chocolate',
    'https://example.com/chocchipcookies.jpg',
    'https://example.com/chocchipcookies-recipe'
);