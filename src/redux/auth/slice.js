import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  signupUser,
  signinUser,
  logoutUser,
  refreshUser,
  currenthUser,
} from "./operations";

axios.defaults.baseURL = "https://water-app-backend.onrender.com";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      _id: null,
      name: null,
      email: null,
      gender: "woman",
      waterRate: 2000,
      photo: null,
    },
    token: null,
    isLoggedIn: false,
    loading: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user.email = action.payload.data.email;
        state.user._id = action.payload.data._id;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
        state.user._id = action.payload.data.userId;
        state.loading = false;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(currenthUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(currenthUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = { ...state.user, ...action.payload.data };
        state.isRefreshing = false;
      })
      .addCase(currenthUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
