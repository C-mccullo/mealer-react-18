
const RecipeListIngredient = ({ ingredient, portionSize }): JSX.Element => {
  return (
    <li className="recipeIngredient">
      <span className="recipeIngredient-name">{ingredient.name}</span>
      <span className="recipeIngredient-portion">{portionSize}</span>
    </li>
  )
}

export default RecipeListIngredient;