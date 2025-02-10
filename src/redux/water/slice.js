import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/operations";
import {
  fetchWaterCupsToday,
  deleteWaterCup,
  fetchWaterRecord,
  fetchWaterToday,
  saveWaterCup,
  getWaterMonth,
  updateWaterRecord,
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
    waterRecord: [],
    dailyWater: null,
    monthStats: [],
    totalWaterAmount: 0,
    dailyNorm: 0,
    percentage: 0,
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
          (record) => record._id !== action.payload
        );
      })
      .addCase(deleteWaterCup.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        state.waterRecords = [];
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchWaterRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.waterRecord = action.payload;
      })
      .addCase(fetchWaterRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveWaterCup.pending, handlePending)
      .addCase(saveWaterCup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRecords.push(action.payload.data);
        state.totalWaterAmount += action.payload.data.amount;
        state.percentage = Math.min(
          (state.totalWaterAmount / state.dailyNorm) * 100
        );
      })
      .addCase(saveWaterCup.rejected, handleRejected)

      .addCase(fetchWaterToday.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        state.totalWaterAmount = action.payload.totalWaterAmount;
        state.dailyNorm = action.payload.dailyNorm;
        state.percentage = action.payload.percentage;
      })
      .addCase(fetchWaterToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getWaterMonth.pending, handlePending)
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthStats = action.payload;
      })
      .addCase(getWaterMonth.rejected, handleRejected)

      .addCase(updateWaterRecord.pending, handlePending)
      .addCase(updateWaterRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const index = state.waterRecords.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) {
          state.waterRecords[index] = action.payload;
        }
      })
      .addCase(updateWaterRecord.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
