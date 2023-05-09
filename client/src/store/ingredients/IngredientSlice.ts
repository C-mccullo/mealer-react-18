import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/index.types';

const initialState: Ingredient[] = [{
  name: undefined
}]

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    // FETCH_RECIPES
    fetchIngredients: (state) => {
      return state
    },
    // ADD_RECIPE
    addIngredient: (state, action: PayloadAction) => {
      return state
    },
    // DELETE_RECIPE
    deleteIngredient: (state, action: PayloadAction) => {
      return state
    }
  }
});

export const { addIngredient, fetchIngredients, deleteIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;