import React from "react";
import { redirect, Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";

const AddRecipePage = ({ isLoggedIn, ...props }) => {
  if (isLoggedIn) {
    return (
      <div>
        <Link className="addFormLink" to="/recipes/addrecipe">Make a New Recipe</Link>
        {/* <AddRecipeForm ingredientList={props.ingredientList}
          fetchRecipes={props.fetchRecipes} fetchFoods={props.fetchFoods}
          fetchIngredients={props.fetchIngredients}
        /> */}
        <RecipeList deleteRecipe={props.deleteRecipe} recipes={props.recipes} />
      </div>
    )
  }
  return redirect('/login');
}

export default AddRecipePage;