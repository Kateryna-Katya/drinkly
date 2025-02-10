export const selectWaterRecordsToday = (state) => state.water.waterRecords;
export const selectWaterLoading = (state) => state.water.loading;
export const selectWaterError = (state) => state.water.error;

export const selectDailyWaterIntake = (state) => state.water.dailyWater;
export const selectMonthIntake = (state) => state.water.monthStats;