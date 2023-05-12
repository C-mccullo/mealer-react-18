import React from "react";

// Needs toggleIngredient, ingredientClass
const RecipeIncrementer = ({ recipe, item }) => {

  // 👇 INVESTIGATE WHY includes() did not work
  const recipeIngredients = recipe.ingredients;

  const toggleIngredient = (item) => {
    const ingredient = Object.assign({}, item);
    ingredient.portionSize = 1;

  }

  const ingredientClass = (ingredient) => {
    if (recipeIngredients.filter(e => e._id === ingredient._id).length > 0) {
      return "ingredient ingredient-selected";
    }
    return "ingredient";
  }

  const portionCount = (id) => {
    const ingredient = recipeIngredients.filter(e => e._id === id)
    const portion = ingredient[0] ? ingredient[0].portionSize : 0
    return portion
  }

  return(
    <div>
      <label htmlFor={ `ingredient-${item._id}` }
        onClick={ () => toggleIngredient(item) }
        className={ ingredientClass(item) }>
        {item.name}
      </label>
      <div className="recipeIncrementer">
        {/* TODO: CREATE AN INCREMENTER BASE COMPONENT */}
        <button className="recipeIncrementer-button"
        >-</button>
        <div className="recipeIncrementer-counter">
          { portionCount(item._id) }
        </div>
        <button className="recipeIncrementer-button"
        >+</button>
      </div>
    </div>
  )
}

export default RecipeIncrementer;