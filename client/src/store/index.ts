import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ingredientReducer from './ingredients/IngredientSlice';
import userReducer from './user/userSlice';
import recipeReducer from './recipes/recipeSlice';
// add in other stores as they are built

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    user: userReducer,
    recipes: recipeReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;