import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import Root, { loader as rootLoader } from './components/Root';
import TodoList, { loader as todoLoader, action as todoAction } from './components/TodoList';

import './index.css';
import Recipe, { loader as recipeLoader } from './components/Recipe';
import Recipes, { loader as recipesLoader } from './routes/Recipes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
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
          }
        ]
      },

      {
        path: '/todo',
        element: <TodoList />,
        loader: todoLoader,
        action: todoAction
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
