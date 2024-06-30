import { useLoaderData } from 'react-router-dom';
import { Recipe as IRecipe } from '../../types';
import type { Params } from 'react-router-dom';

export async function loader({ params }: { params: Params<'recipeId'> }) {
  const results = await fetch(`http://localhost:3000/recipes/${params.recipeId}`);
  const recipe = await results.json();
  return { recipe };
}

function Recipe() {
  const { recipe } = useLoaderData() as { recipe: IRecipe };
  const ingredients = recipe.ingredients.split(', ');
  const steps = recipe.steps.split(', ');

  return (
    <div>
      <h1>{recipe.name}</h1>
      <div className="text-left pl-5">
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Recipe;
