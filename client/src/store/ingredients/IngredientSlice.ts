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
    // ADD_RECIPE
    addIngredient: (state, action) => {
      return state
    },
    // DELETE_RECIPE
    deleteIngredient: (state, action) => {
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      return state
    }),
    builder.addCase(getIngredientsThunk.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
      return action.payload
    }),
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      // add error message to global error state obj
      return []
    })
  }
});

export const { addIngredient, deleteIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;