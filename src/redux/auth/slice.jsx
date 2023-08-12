import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  changeTheme,
  updateUser,
  logInWithGoogle,
} from './operations';

const initialState = {
  user: { name: null, email: null, theme: 'dark' },
  token: null,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isUpdating: false,
};

const registerPending = (state, action) => {
  state.isLoading = true;
};

const registerRejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const signInPending = (state, action) => {
  state.isLoading = true;
};

const signInFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.accessToken;
  state.isLoggedIn = true;
  state.isLoading = false;
  state.error = null;
};

const signInRejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const logOutPending = (state, action) => {
  state.isLoggedIn = true;
};

const logOutFulfilled = (state, action) => {
  state.user = null;
  state.token = null;
  state.isLoggedIn = false;
  state.error = null;
};

const logOutRejected = (state, action) => {
  state.error = action.payload;
};

const refreshUserPending = (state, action) => {
  state.isRefreshing = true;
};

const refreshUserFulfilled = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.error = null;
};

const refreshUserRejected = (state, action) => {
  state.error = action.payload;
  state.isRefreshing = false;
};

const changeThemePending = (state, action) => {
  state.isUpdating = true;
};

const changeThemeFulfilled = (state, action) => {
  state.user.theme = action.payload;
  state.error = null;
  state.isUpdating = false;
};

const changeThemeRejected = (state, action) => {
  state.error = action.payload;
  state.isUpdating = false;
};

const updateUserPending = (state, action) => {
  state.isUpdating = true;
};

const updateUserFulfilled = (state, action) => {
  if (!action.payload) {
    state.user = { name: null, email: null, theme: 'dark' };
    state.token = null;
    state.isLoggedIn = false;
    state.isUpdating = false;
    return;
  }
  state.user = action.payload;
  state.error = null;
  state.isUpdating = false;
};

const updateUserRejected = (state, action) => {
  state.error = action.payload;
  state.isUpdating = false;
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
    builder.addCase(logInWithGoogle.fulfilled, signInFulfilled);
    builder.addCase(logOut.pending, logOutPending);
    builder.addCase(logOut.fulfilled, logOutFulfilled);
    builder.addCase(logOut.rejected, logOutRejected);
    builder.addCase(refreshUser.pending, refreshUserPending);
    builder.addCase(refreshUser.fulfilled, refreshUserFulfilled);
    builder.addCase(refreshUser.rejected, refreshUserRejected);
    builder.addCase(changeTheme.pending, changeThemePending);
    builder.addCase(changeTheme.fulfilled, changeThemeFulfilled);
    builder.addCase(changeTheme.rejected, changeThemeRejected);
    builder.addCase(updateUser.pending, updateUserPending);
    builder.addCase(updateUser.fulfilled, updateUserFulfilled);
    builder.addCase(updateUser.rejected, updateUserRejected);
  },
});
export default authSlice.reducer;
