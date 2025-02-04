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
      gender: null,
      waterRate: null,
      photo: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
  },
});

export default authSlice.reducer;
