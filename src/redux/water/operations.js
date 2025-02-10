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

export const fetchWaterToday = createAsyncThunk(
  "water/fetchToday",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/water/today");
      // console.log("Fetched data:", response.data);
      return {
        totalWaterAmount: data.data.totalWaterAmount,
        dailyNorm: data.data.dailyNorm,
        percentage: data.data.percentage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterRecord = createAsyncThunk(
  "water/updateWaterRecord",
  async ({ recordId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`/water/${recordId}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  "water/getMonthIntake",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water/month");
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
      await axios.delete(`/water/${_id}`);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveWaterCup = createAsyncThunk(
  "water/saveWaterCup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/water", data);
      console.log(response.data);
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
      const response = await axios.get(`/water/${_id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
