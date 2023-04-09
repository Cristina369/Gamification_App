import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    authStart: (state) => {
      state.isFetching = true;
    },
    authSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
    },
    authFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    logout: (state) => {
      state.user = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
