import RecipeListIngredient from './RecipeListIngredient'
import { RecipeIngredient, Recipe } from '~/types/index.types';

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeCardProps): JSX.Element => {
  const recipeIngredients: RecipeIngredient[] = recipe.ingredients;
  return (
    <div
      className="recipe">
      <div className="recipeItem-header">
        <h3>{recipe.name}</h3>
      </div>
      <ul>
        {
          recipeIngredients.map((ingredient, i) => {
            return <li>
              <RecipeListIngredient
                key={i}
                ingredient={ingredient}
                portionSize={ingredient.portionSize}/>
            </li>
          })
        }
      </ul>
      <span className="deleteRecipe" role="button">Delete Recipe</span>
    </div>
  )
}

export default RecipeCard