import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'shawn',
  host: 'localhost',
  database: 'db',
  password: 'password',
  port: 5432
});

app.use(cors());

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
    const result = await client.query('SELECT * FROM todos');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  console.log('Fetching recipe with id', recipeId);

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM recipes WHERE id = $1', [recipeId]);
    client.release();
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // return the first row
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (err) {
    console.error('Error fetching recipe', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
