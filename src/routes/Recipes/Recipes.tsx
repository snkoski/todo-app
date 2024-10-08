import { Outlet, useLoaderData } from 'react-router-dom';
import { Recipe } from '../../types';
import RecipesList from '../../components/RecipesList';

export async function loader() {
  const results = await fetch('http://localhost:3000/recipes');
  const recipes = await results.json();
  return { recipes };
}

function Recipes() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };
  return (
    <>
      <div>Recipes</div>
      <div className="flex justify-items-start ">
        <div className="border border-violet-700">
          
          <RecipesList recipes={recipes} />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Recipes;
