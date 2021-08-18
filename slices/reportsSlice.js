import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weekly:null,
  monthly:null,
  yearly:null,
};

export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    weeklyData : (state,action) =>{
        state.weekly = action.payload 
    },
    monthlyData : (state,action) =>{
      state.monthly = action.payload
    },
    yearlyData : (state,action) =>{
      state.yearly = action.payload
    },
  },
});

export const  {weeklyData,monthlyData,yearlyData}  = reportSlice.actions;
export const selectWeeklyData = (state) => state.reports.weekly;
export const selectMonthlyData = (state) => state.reports.monthly;
export const selectYearlyData = (state) => state.reports.yearly;

export default reportSlice.reducer;
