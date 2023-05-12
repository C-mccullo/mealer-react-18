import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store'
import { getUserRecipesThunk } from '../store/recipes/recipeSlice'
import { Recipe } from '../types/index.types'


import RecipeList from "../components/RecipeList";
import AddRecipeForm from "../components/AddRecipeForm";

const RecipePage = () => {

  const dispatch = useAppDispatch()
  const recipes = useAppSelector<Recipe[]>(state => state.recipes)

  useEffect(() => {
    console.log('dispatch the inventory call')
    dispatch(getUserRecipesThunk())
  }, [dispatch])

  // add ability to remove a recipe from your list
  // (this will have to check user mealplan to see if it is referenced as well)

  return (
    <div>
      <Link className="addFormLink" to="/recipes/addrecipe">Make a New Recipe</Link>
      {/* TODO: TESTING ONLY: remove after */}
      <AddRecipeForm/>
      <RecipeList
        recipes={recipes}
      />
    </div>
  )
}

export default RecipePage;