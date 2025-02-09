import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://water-app-backend.onrender.com";

export const fetchWaterCupsToday = createAsyncThunk(
  "water/fetchAllWaterCupsToday",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water/today");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterCup = createAsyncThunk(
  "water/deleteWaterCup",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterRecord = createAsyncThunk(
  "/water/fetchWaterRecord",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.put(`/water/${_id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
