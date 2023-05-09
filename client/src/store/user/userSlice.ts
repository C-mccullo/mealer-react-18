import { createAsyncThunk, createSlice, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import { User } from '../../types/index.types';

interface LoggedInState {
  user: User,
  isLoggedIn: boolean
}

const initialState: LoggedInState = {
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
      const data = await fetch("/api/v1/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData)
        }).then(res => res.json());
      return data
    } catch(err) {
      return rejectWithValue(err)
    }
})

export const signInUserThunk = createAsyncThunk(
  'user/signInUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const data = await fetch("/api/v1/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData)
        }).then(res => res.json());
      return data
    } catch(err) {
      return rejectWithValue(err)
    }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ADD_RECIPE_TO_USER

    signOutUser: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = !!action.payload
    },
  },
  extraReducers: builder => {
    // POST NEW USER
    builder.addCase(postNewUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      const { firstName, lastName, email } = action.payload
      state = {
        ...state,
        user: {
          firstName: firstName,
          lastName: lastName,
          email: email
        },
        isLoggedIn: true
      };
    }),
    builder.addCase(postNewUserThunk.pending, (state) => {
      state.isLoggedIn = false;
    }),
    builder.addCase(postNewUserThunk.rejected, (state) => {
      // TODO: add api error to app error alert?
      state.user = initialState.user;
    }),
    // GET USER
    builder.addCase(signInUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
      const { firstName, lastName, email } = action.payload
      state.user = {
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    }),
    builder.addCase(signInUserThunk.pending, (state) => {
      state.isLoggedIn = false;
    }),
    builder.addCase(signInUserThunk.rejected, (state) => {
      // add api error to app error alert?
      state.user = initialState.user;
    })
  }
});

export const { signOutUser } = userSlice.actions;
export default userSlice.reducer;