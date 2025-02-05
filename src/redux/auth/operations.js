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
    setAuthHeader(data.token)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signinUser = createAsyncThunk ("/auth/signinUser",
  async (user, thunkAPI)=>{
    try{
      const{data}=await axios.post("/auth/login", user);
      setAuthHeader(data.token)
      return data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
export const refreshUser=createAsyncThunk("/auth/refreshUser",
  async(__,thunkAPI)=>{
    const state=thunkAPI.getState();
    if(state.auth.token===null){
      return thunkAPI.rejectWithValue("No token provided to refresh user data");
    }try{
      setAuthHeader(state.auth.token);
      const{data}=await axios.get("/auth/refresh");
      return data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const logoutUser= createAsyncThunk(
  "/auth/logoutUser",
  async(__,thunkAPI)=>{
    try{
      await axios.post("/auth/logout");
      clearAuthHeader();
    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
