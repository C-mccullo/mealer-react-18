import React from "react";
import { redirect } from "react-router-dom";
import MealPlanForm from "../components/MealPlanForm";
import MealPlanList from "../components/MealPlanList";

const MealPlanRoute = ({ isLoggedIn, ...props }) => {
  if (isLoggedIn) {
    return (
      <div>
        <MealPlanForm mealPlan={props.weekMealPlan}
          recipes={props.recipes}
          fetchMealPlan={props.fetchMealPlan}
          postMealPlan={props.postMealPlan}
        />
        <MealPlanList mealPlan={props.weekMealPlan} />
      </div>
    )
  }
  return redirect('/login');
}

export default MealPlanRoute;