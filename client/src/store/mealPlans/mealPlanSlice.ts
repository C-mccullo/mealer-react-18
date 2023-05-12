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
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/mealplan", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
      return res.data;
    } catch(err) {
      console.log(err);
      return rejectWithValue(err.errors)
    }
})

export const saveUserMealPlanThunk = createAsyncThunk(
  'mealplan/saveUserMealPlan',
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/mealplan", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          // data: state of userMealPlan
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
      //  add payload to specified meal plan day
    },
    removeMealFromPlan: (state, action) => {
      // remove action payload from meal plan day
    }
  },
  extraReducers: builder => {
    // GET_USER_RECIPES
    builder.addCase(getUserMealPlanThunk.fulfilled, (state, action: PayloadAction<MealPlan>) => {
      return action.payload
    }),
    builder.addCase(getUserMealPlanThunk.pending, (state) => {
      // state.isLoggedIn = false;
    }),
    builder.addCase(getUserMealPlanThunk.rejected, (state, action) => {
      // TODO: add api error to app error alert?
      console.log(action)
      state = initialState
    }),
    builder.addCase(saveUserMealPlanThunk.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(saveUserMealPlanThunk.pending, (state, action) => {
      // trigger loader
    })
    builder.addCase(saveUserMealPlanThunk.rejected, (state, action) => {
      // return an error and display the message
    })
  }
});

export const { addMealToMealPlan } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;