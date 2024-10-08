import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import Root from './routes/Root';
import TodoList, { loader as todoLoader, action as todoAction } from './components/TodoList';

import './index.css';
import Recipe, { loader as recipeLoader } from './components/Recipe';
import Recipes, { loader as recipesLoader } from './routes/Recipes';
import BenchMarker from './routes/BenchMarker';
import BenchReview, { loader as benchReviewLoader } from './components/BenchReview';
import Benches from './routes/Benches';
import NewRecipe from './components/NewRecipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/recipes',
        element: <Recipes />,
        loader: recipesLoader,
        children: [
          {
            path: '/recipes/:recipeId',
            element: <Recipe />,
            loader: recipeLoader
          },
          {
            path: '/recipes/new',
            element: <NewRecipe />
          }
        ]
      },

      {
        path: '/todo',
        element: <TodoList />,
        loader: todoLoader,
        action: todoAction
      },

      {
        path: '/benchmarker',
        element: <BenchMarker />,
        children: [
          {
            path: '/benchmarker/:reviewId',
            element: <BenchReview />,
            loader: benchReviewLoader
          },
          { path: 'benches', element: <Benches /> }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
