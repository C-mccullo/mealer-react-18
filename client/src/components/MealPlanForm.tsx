import { FC } from "react";
import MealPlanModal from "./MealPlanModal";

const MealPlanForm = () => {
  // Make a Type for the Meal Plan Form
  const state = {
    daySelected: "",
    recipeArray: [],
    isModalOpen: false
  }

  // Open Modal
  const openModal = () => {
  }
  // Close Modal
  const closeModal = () => {
  }

  // reset Form State
  const resetForm = () => {
  }

  const mapRecipes = () => {
    // Map over the selected recipes and add them to the form view
    return (
      state.recipeArray.map((recipe) => <li key={`meal-${recipe._id}`}>{recipe.name}</li>)
    );
  }

  const addRecipe = (recipe) => {
  }

  const removeRecipe = (recipe) => {
  }

  const changeDaySelected = (e) => {
  }
  // SUBMITS THE MEAL PLAN FOR A CERTAIN DAY TO BACKEND?
  // TODO: Or Should this UI be altered?
  const onSubmit = () => {
    //
  }

  return (
    <div>
      <form className="form" onSubmit={e => this.submitMeal(e)}>
        {/* <button className="form-close">X</button> */}
        <div className="form-row">
          <h2>MealPlanForm</h2>
          <select className="form-select" name="day" value={ state.daySelected }>
            <option value="" defaultValue disabled hidden>Choose a day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <ul className="recipe-Ingredients">
            { mapRecipes() }
          </ul>
          {/* wtf? */}
          {/* <MealPlanModal/> */}
          <button className="button button-blue" type="button" onClick={ () => openModal() }>Add Recipes</button>
        </div>
        <div className="form-row">
          <button className="button button-green" type="submit">Add to Meal Plan</button>
        </div>
      </form>
    </div>
  )
}

export default MealPlanForm;

