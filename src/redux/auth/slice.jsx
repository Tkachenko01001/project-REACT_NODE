import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, fetchCurrentUser } from './operations';
import { object, string } from 'yup';

export const registerSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
});

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const signUpFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const signInFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const logOutFulfilled = (state, action) => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const fetchCurrentUserPending = (state, action) => {
  state.isFetchingCurrentUser = true;
};

const fetchCurrentUserFulfilled = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isFetchingCurrentUser = false;
};

const fetchCurrentUserRejected = (state, action) => {
  state.isFetchingCurrentUser = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, signUpFulfilled);
    builder.addCase(logIn.fulfilled, signInFulfilled);
    builder.addCase(logOut.fulfilled, logOutFulfilled);
    builder.addCase(fetchCurrentUser.pending, fetchCurrentUserPending);
    builder.addCase(fetchCurrentUser.fulfilled, fetchCurrentUserFulfilled);
    builder.addCase(fetchCurrentUser.rejected, fetchCurrentUserRejected);
  },
});
export const authReducer = authSlice.reducer;
