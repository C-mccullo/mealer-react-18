import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/index.types';
import axios, { AxiosResponse } from 'axios';

const initialState: Ingredient[] = []

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/ingredients", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      return res.data;
    } catch(err) {
      console.log(err);
      return rejectWithValue(err.errors)
    }
})

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
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state
    }),
    builder.addCase(getIngredientsThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state = action.payload
    }),
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      // add error message to global error state obj
      state = []
    })
  }
});

export const { addIngredient, fetchIngredients, deleteIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;