import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { signupUser } from "./operations";

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
      });
  },
});

export default authSlice.reducer;
