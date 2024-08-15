import { Outlet, useLoaderData } from 'react-router-dom';
import { Recipe } from '../../types';

export async function loader() {
  const results = await fetch('http://localhost:3000/recipes');
  const recipes = await results.json();
  return { recipes };
}

function BenchMarker() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };
  console.log('recipes', recipes);
  console.log({ recipes });

  return (
    <>
      <div>BenchMarker</div>
      <div className="flex justify-items-start ">
        <div className="border border-violet-700"></div>
        <Outlet />
      </div>
    </>
  );
}

export default BenchMarker;
