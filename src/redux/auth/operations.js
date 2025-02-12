import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", user);
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", user);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const currenthUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    if (state.auth.token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(state.auth.token);
      const { data } = await axios.get(`/users`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (__, thunkAPI) => {
    const state = thunkAPI.getState();
    if (state.auth.token === null) {
      return thunkAPI.rejectWithValue("No token provided to refresh user data");
    }
    try {
      setAuthHeader(state.auth.token);
      const { data } = await axios.get("/auth/refresh");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (__, thunkAPI) => {
    try {
      await axios.post("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.patch("/users", formData);


      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserPhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (photoFile, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      if (!state.auth.token) {
        return thunkAPI.rejectWithValue("Invalid token");
      }

      const formData = new FormData();
      formData.append("avatar", photoFile);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${state.auth.token}`;

      const { data } = await axios.patch(`/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
