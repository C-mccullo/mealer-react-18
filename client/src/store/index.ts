import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ingredientReducer from './ingredients/IngredientSlice';
import userReducer from './user/userSlice';
import recipeReducer from './recipes/recipeSlice';
import mealPlanReducer from './mealPlans/mealPlanSlice';
import inventoryReducer from './inventory/inventorySlice';
// add in other stores as they are built

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    inventory: inventoryReducer,
    user: userReducer,
    recipes: recipeReducer,
    mealPlan: mealPlanReducer
  },
  devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;