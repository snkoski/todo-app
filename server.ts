import express, { Express } from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app: Express = express();
const port = 3000;

const pool = new Pool({
  user: 'skoski',
  host: 'localhost',
  database: 'db',
  password: 'password',
  port: 5432
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database at', res.rows[0].now);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint' });
});

app.get('/recipes', async (req, res) => {
  console.log('Fetching recipes');
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM recipes');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching recipes', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/todos', async (req, res) => {
  console.log('Fetching todos');
  try {
    const client = await pool.connect();
    console.log('Connected to database:', client.database);
    console.log('Client:', client);

    const result = await client.query('SELECT * FROM todos WHERE deleted = false');
    console.log('Result:', result);

    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/todos', async (req, res) => {
  console.log('Creating a new todo', req.body);
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  console.log('Creating todo with title', title);
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating todo', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/todos/edit', async (req, res) => {
  console.log('Editing a todo', req.body);
  const { id, ...fields } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const fieldKeys = Object.keys(fields);
  console.log('Fields to update:', fieldKeys);

  if (fieldKeys.length === 0) {
    return res.status(400).json({ error: 'At least one field to update is required' });
  }

  const setClause = fieldKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = Object.values(fields);
  values.push(id);
  console.log('VALUES.LENGTH', values.length);

  const query = `UPDATE todos SET ${setClause} WHERE id = $${values.length} RETURNING *`;

  console.log('Query:', query);
  console.log('Values:', values);

  try {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error editing todo', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/todos/delete', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE todos SET deleted = true WHERE id = $1 RETURNING *', [
      id
    ]);
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting todo', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  console.log('Fetching recipe with id', recipeId);

  try {
    const client = await pool.connect();

    // Fetch the recipe details
    const recipeQuery = `
      SELECT id, name, description, author, image_url, source_url, created_at, modified_at
      FROM recipes
      WHERE id = $1
    `;
    const recipeResult = await client.query(recipeQuery, [recipeId]);

    if (recipeResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const recipe = recipeResult.rows[0];

    // Fetch the recipe steps
    const stepsQuery = `
      SELECT step_number, content
      FROM recipe_steps
      WHERE recipe_id = $1
      ORDER BY step_number ASC
    `;
    const stepsResult = await client.query(stepsQuery, [recipeId]);

    // Fetch the recipe ingredients
    const ingredientsQuery = `
      SELECT 
        i.name AS ingredient,
        ri.quantity,
        m.name AS measurement
      FROM recipe_ingredients ri
      JOIN ingredients i ON ri.ingredient_id = i.id
      JOIN measurements m ON ri.measurement_id = m.id
      WHERE ri.recipe_id = $1
    `;
    const ingredientsResult = await client.query(ingredientsQuery, [recipeId]);

    client.release();

    // Combine the data into a single response object
    const fullRecipe = {
      ...recipe,
      steps: stepsResult.rows,
      ingredients: ingredientsResult.rows
    };

    res.json(fullRecipe);
  } catch (err) {
    console.error('Error fetching recipe', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
