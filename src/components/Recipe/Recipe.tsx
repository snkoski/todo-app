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
  console.log('recipe', recipe);

  // TODO: Find better way to store/split the steps

  // return <div>hello</div>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <div className="text-left pl-5">
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.ingredient}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>
              {step.step_number}. {step.content}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Recipe;
