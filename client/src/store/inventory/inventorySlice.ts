import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InventoryItem } from '../../types/index.types';
import axios, { AxiosResponse } from 'axios';

const initialState: InventoryItem[] = []

export const getUserInventoryThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/inventory", {
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

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // ADD_RECIPE
    addInventoryItem: (state, action: PayloadAction) => {
      return state
    },
    // DELETE_RECIPE
    deleteInventoryItem: (state, action: PayloadAction) => {
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInventoryThunk.pending, (state) => {
      state
    }),
    builder.addCase(getUserInventoryThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state = action.payload
    }),
    builder.addCase(getUserInventoryThunk.rejected, (state) => {
      // add error message to global error state obj
      state = []
    })
  }
});

export const { addInventoryItem, deleteInventoryItem } = inventorySlice.actions;
export default inventorySlice.reducer;