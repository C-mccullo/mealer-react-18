import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { MealPlan, Recipe } from '../../types/index.types';


const initialState: MealPlan = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
}

export const getUserMealPlanThunk = createAsyncThunk(
  'mealplan/getUserMealPlan',
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

const mealPlanSlice = createSlice({
  name: 'mealplans',
  initialState,
  reducers: {
    // ADD_A_USERS_RECIPE
    addMealToMealPlan: (state, action: PayloadAction<Recipe>) => {
      //  add payload to specified day
    },
  },
  extraReducers: builder => {
    // GET_USER_RECIPES
    builder.addCase(getUserMealPlanThunk.fulfilled, (state, action: PayloadAction<MealPlan>) => {
      state = action.payload
    }),
    builder.addCase(getUserMealPlanThunk.pending, (state) => {
      // state.isLoggedIn = false;
    }),
    builder.addCase(getUserMealPlanThunk.rejected, (state, action) => {
      // TODO: add api error to app error alert?
      console.log(action)
      state = initialState
    })
  }
});

export const { addMealToMealPlan } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;