import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/index.types';
import { LoginForm } from '../../components/Login';
import axios, { AxiosResponse } from 'axios';
interface LogInState {
  user: User,
  isLoggedIn: boolean
}

const initialState: LogInState = {
  user: {
    email: undefined,
    firstName: undefined,
    lastName: undefined
  },
  isLoggedIn: false
}

export const postNewUserThunk = createAsyncThunk(
  'user/postNewUser',
  async (userData: User,  { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(userData)
        });
      return res.data;
    } catch(err) {
      return rejectWithValue(err.errors)
    }
})

export const signInUserThunk = createAsyncThunk(
  'user/signInUser',
  async (userData: LoginForm, { rejectWithValue }) => {
    try {
      const res: AxiosResponse = await axios("/api/v1/login", {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    // POST NEW USER
    builder.addCase(postNewUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      const { firstName, lastName, email } = action.payload
      state.user = {
        firstName,
        lastName,
        email
      },
      state.isLoggedIn = true;
    }),
    builder.addCase(postNewUserThunk.pending, (state) => {
      // state.isLoggedIn = false;
    }),
    builder.addCase(postNewUserThunk.rejected, (state, action) => {
      // TODO: add api error to app error alert?
      console.log(action)
      state.user = initialState.user;
    }),

    // LOGIN USER
    builder.addCase(signInUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
      const { firstName, lastName, email } = action.payload
      state.user = {
        firstName,
        lastName,
        email
      },
      state.isLoggedIn = true
    }),
    builder.addCase(signInUserThunk.pending, (state) => {
      // add loading state here
    }),
    builder.addCase(signInUserThunk.rejected, (state) => {
      // add api error to app error alert?
      state.user = initialState.user;
    })
  }
});

export const { signOutUser } = userSlice.actions;
export default userSlice.reducer;