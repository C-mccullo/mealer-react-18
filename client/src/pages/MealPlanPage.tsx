import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store'
import { getUserMealPlanThunk } from '../store/mealPlans/mealPlanSlice'
import { MealPlan } from '../types/index.types'
import MealPlanForm from "../components/MealPlanForm";
import MealPlanChart from "../components/MealPlanChart";

const MealPlanRoute = () => {

  const dispatch = useAppDispatch()
  const mealPlan = useAppSelector<MealPlan>(state => state.mealPlan)

  useEffect(() => {
    console.log('dispatch the inventory call')
    dispatch(getUserMealPlanThunk())
  }, [dispatch])

  return (
    <div>
      <MealPlanForm />
      <MealPlanChart mealPlan={mealPlan} />
    </div>
  )
}

export default MealPlanRoute;