import React from "react";
import RecipeCard from "./RecipeCard";


const RecipeList = ({ recipes }) => {
  return (
    <div className="recipeList">
      {
        (recipes || []).map((recipe) => {
          return (
            <RecipeCard recipe={ recipe }/>
          )
        })
      }
    </div>
  )
}

export default RecipeList