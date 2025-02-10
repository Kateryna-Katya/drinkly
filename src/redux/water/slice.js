import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/operations";
import {
  fetchWaterCupsToday,
  deleteWaterCup,
  saveWaterCup,
  getWaterMonth,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterRecords: [],
    dailyWater: null,
    monthStats: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterCupsToday.pending, handlePending)
      .addCase(fetchWaterCupsToday.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRecords = action.payload.data.waterRecords;
      })
      .addCase(fetchWaterCupsToday.rejected, handleRejected)

      .addCase(deleteWaterCup.pending, handlePending)
      .addCase(deleteWaterCup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRecords = state.waterRecords.filter(
          (record) => record._id !== action.payload // Удаляем запись по _id
        );
      })
      .addCase(deleteWaterCup.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        state.waterRecords = [];
        state.error = null;
        state.loading = false;
      })
      .addCase(saveWaterCup.pending, handlePending)
      .addCase(saveWaterCup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRecords.push(action.payload.data);
      })
      .addCase(saveWaterCup.rejected, handleRejected)

      .addCase(getWaterMonth.pending, handlePending)
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthStats = action.payload;
      })
      .addCase(getWaterMonth.rejected, handleRejected);
  }
});

export const waterReducer = waterSlice.reducer;
