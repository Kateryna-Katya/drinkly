import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/operations";
import {
  fetchWaterCupsToday,
  deleteWaterCup,
  fetchWaterRecord,
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
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterCupsToday.pending, handlePending)
      .addCase(fetchWaterCupsToday.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRecords = action.payload;
      })
      .addCase(fetchWaterCupsToday.rejected, handleRejected)

      .addCase(deleteWaterCup.pending, handlePending)
      .addCase(deleteWaterCup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.waterRecords.findIndex(
          (waterRecord) => waterRecord._id === action.payload._id
        );
        state.waterRecords.splice(index, 1);
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
        state.waterRecords = action.payload;
      })
      .addCase(fetchWaterRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
