import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Recipe } from '../../types/index.types';


const initialState: Recipe[] = []

export const getUserRecipesThunk = createAsyncThunk(
  'recipes/getUserRecipes',
  async (userData: any, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(userData)
        });
      return res.data;
    } catch(err) {
      console.log(err);
      return rejectWithValue(err.errors)
    }
})

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // ADD_A_USERS_RECIPE
    addUserRecipe: (state, action: PayloadAction<any>) => {
      state.push(action.payload)
    },
  },
  extraReducers: builder => {
    // GET_USER_RECIPES
    builder.addCase(getUserRecipesThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state = action.payload
    }),
    builder.addCase(getUserRecipesThunk.pending, (state) => {
      // state.isLoggedIn = false;
    }),
    builder.addCase(getUserRecipesThunk.rejected, (state, action) => {
      // TODO: add api error to app error alert?
      console.log(action)
      state = []
    })
  }
});

export const { addUserRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;