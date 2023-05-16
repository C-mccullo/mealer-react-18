import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store'
import { getUserRecipesThunk } from '../store/recipes/recipeSlice'
import { Recipe } from '../types/index.types'


import RecipeList from "../components/RecipeList";
import SearchRecipeForm from "../components/SearchRecipeForm";

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
      {/* TODO: TESTING ONLY: remove after */}
      <SearchRecipeForm/>
      <RecipeList
        recipes={recipes}
      />
    </div>
  )
}

export default RecipePage;