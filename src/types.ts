export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string;
  steps: string;
  description: string;
}

export interface BenchReview {
  id: number;
  benchId: number;
  rating: number;
  comment?: string;
}