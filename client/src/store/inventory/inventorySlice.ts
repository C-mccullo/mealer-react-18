import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InventoryItem } from '../../types/index.types';
import axios, { AxiosResponse } from 'axios';

const initialState: InventoryItem[] = []

export const getUserInventoryThunk = createAsyncThunk(
  'inventory/getUserInventory',
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInventoryThunk.pending, (state) => {
      //
    }),
    builder.addCase(getUserInventoryThunk.fulfilled, (state, action) => {
      return action.payload
    }),
    builder.addCase(getUserInventoryThunk.rejected, (state) => {
      // add error message to global error state obj
      state = []
    })
  }
});

// export const {} = inventorySlice.actions;
export default inventorySlice.reducer;