import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weeklyFinancesLabels:null,
  weeklyFinancesDataset:null,
  weeklyAppointmentsLabels:null,
  weeklyAppointmentsDataset:null,
  monthlyFinancesLabels:null,
  monthlyFinancesDataset:null,
  monthlyAppointmentsLabels:null,
  monthlyAppointmentsDataset:null,
};

export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    weeklyFLData : (state,action) =>{
        state.weeklyFinancesLabels = action.payload 
    },
    weeklyFData : (state,action) =>{
      state.weeklyFinancesDataset = action.payload 
  },
    monthlyData : (state,action) =>{
      state.monthly = action.payload
    },
    yearlyData : (state,action) =>{
      state.yearly = action.payload
    },
  },
});

export const  {weeklyFLData,weeklyFData,yearlyData}  = reportSlice.actions;
export const selectWeeklyFL = (state) => state.reports.weeklyFinancesLabels;
export const selectWeeklyFD = (state) => state.reports.weeklyFinancesDataset;
export const selectMonthlyData = (state) => state.reports.monthly;
export const selectYearlyData = (state) => state.reports.yearly;

export default reportSlice.reducer;
