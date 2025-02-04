import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "auth/signupuser",
  async (user, thunkAPI) => {
    try {
      console.log(user);

      // const { data } = await axios.post("/users/signup", user);
      // setAuthHeader(data.token);
      // return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
