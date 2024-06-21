import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Recipe } from '../../types';

export async function loader() {
  const results = await fetch('http://localhost:3000/recipes');
  const recipes = await results.json();
  return { recipes };
}

function Root() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };

  console.log(recipes);

  return (
    <div>
      <h1>Root Layout</h1>
      <div className="flex">
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`todo`}>Todo List</Link>
            </li>
            {recipes.length ? (
              <>
                {recipes.map((recipe) => {
                  return (
                    <li key={recipe.id}>
                      <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                    </li>
                  );
                })}
              </>
            ) : (
              <p>
                <i>No recipes found</i>
              </p>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Root;
