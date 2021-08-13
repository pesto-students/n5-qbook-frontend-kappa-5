import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentList:null,
  searchTerm:"",
  selectedDate:null,
  appointmentHistoryList:null
};

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    updateAppointmentsList : (state,action) =>{
        state.appointmentList = action.payload 
    },
    updateSearchTerm : (state,action) =>{
      state.searchTerm = action.payload
    },
    updateSelectedDate : (state,action) =>{
      debugger;
      state.selectedDate = action.payload
    },
    updateAppointment : (state,action) =>{
      let index = state.appointmentList.findIndex((patient)=>patient.name===action.payload.name)
      let newAppointmentList = [...state.appointmentList];
      newAppointmentList[index].phoneNumber=action.payload.phoneNumber;
      state.appointmentList = newAppointmentList;
  },
  updateAppointmentsHistoryList : (state,action) =>{
    state.appointmentHistoryList = action.payload 
  },
  },
});

export const  {updateAppointmentsList,updateSearchTerm,updateSelectedDate,updateAppointment,updateAppointmentsHistoryList}  = appointmentSlice.actions;
export const selectAppointmentList = (state) => state.appointments.appointmentList;
export const selectAppointmentHistoryList = (state) => state.appointments.appointmentHistoryList;
export const selectSearchTerm = (state) => state.appointments.searchTerm;
export const selectedDate = (state) => state.appointments.selectedDate;
export default appointmentSlice.reducer;
