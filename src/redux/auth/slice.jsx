import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
};

const registerPending = (state, action) => {
  state.isLoading = true;
};

const registerRejected = (state, action) => {
  state.isLoading = false;
};

const signInPending = (state, action) => {
  state.isLoading = true;
};

const signInFulfilled = (state, action) => {
  state.user = action.payload;
  state.token = action.payload.accessToken;
  state.isLoggedIn = true;
  state.isLoading = false;
};

const signInRejected = (state, action) => {
  state.isLoading = false;
};

const logOutFulfilled = (state, action) => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const refreshUserPending = (state, action) => {
  state.isRefreshing = true;
};

const refreshUserFulfilled = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const refreshUserRejected = (state, action) => {
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.pending, registerPending);
    builder.addCase(register.rejected, registerRejected);
    builder.addCase(logIn.pending, signInPending);
    builder.addCase(logIn.fulfilled, signInFulfilled);
    builder.addCase(logIn.rejected, signInRejected);
    builder.addCase(logOut.fulfilled, logOutFulfilled);
    builder.addCase(refreshUser.pending, refreshUserPending);
    builder.addCase(refreshUser.fulfilled, refreshUserFulfilled);
    builder.addCase(refreshUser.rejected, refreshUserRejected);
  },
});
export default authSlice.reducer;
