import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Recipe } from '../../types';

export async function loader() {
  const results = await fetch('http://localhost:3000/recipes');
  const recipes = await results.json();
  return { recipes };
}

function Root() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };

  return (
    <div>
      <h1 className="text-center text-2xl">Root Layout</h1>
      <div className="flex">
        <nav>
          <ul className="flex-col gap-3 pl-5">
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`todo`}>Todo List</Link>
            </li>
            <li>
              <Link to={`recipes`}>Recipes</Link>
            </li>
          </ul>
        </nav>
        <main className="text-center mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Root;
