import { Recipe } from '../../types';
import { Link } from 'react-router-dom';

type RecipesListProps = {
  recipes: Recipe[];
};

function RecipesList({ recipes }: RecipesListProps) {
  if (recipes.length === 0) {
    return (
      <p>
        <i>No recipes found</i>
      </p>
    );
  }

  return (
    <ul className="flex-col">
      {recipes.map((recipe) => {
        return (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default RecipesList;
