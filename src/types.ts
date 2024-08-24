// User table interface
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Todo table interface
export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  deleted: boolean;
  author: User;
}

// Recipe Step interface
export interface RecipeStep {
  step_number: number;
  content: string;
}

// Recipe interface with steps and ingredients
export interface Recipe {
  id: number;
  name: string;
  description: string;
  author: User;
  image_url: string;
  source_url: string;
  steps: RecipeStep[]; // Array of RecipeStep objects
  ingredients: RecipeIngredient[]; // Array of RecipeIngredient objects
}

// Ingredient table interface
export interface Ingredient {
  id: number;
  name: string;
}

// Measurement table interface
export interface Measurement {
  id: number;
  name: string; // e.g., teaspoon, tablespoon, cup, etc.
}

// Recipe Ingredient table interface
export interface RecipeIngredient {
  ingredient: string;
  measurement: string;
  quantity: number; // e.g., 2 (for 2 tablespoons)
}

export interface BenchReview {
  id: string;
  benchId: string;
  rating: number;
  comment: string;
}
