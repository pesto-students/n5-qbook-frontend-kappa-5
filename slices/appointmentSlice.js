import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentList:null,
  searchTerm:"",
  selectedDate:"",
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
      state.selectedDate = action.payload
    },
    updateAppointment : (state,action) =>{
      debugger;
      let index = state.appointmentList.findIndex((patient)=>patient.name===action.payload.name)
      let newAppointmentList = [...state.appointmentList];
      newAppointmentList[index].phoneNumber=action.payload.phoneNumber;
      console.log(newAppointmentList,"patientInfo")
      state.appointmentList = newAppointmentList;
  },
  },
});

export const  {updateAppointmentsList,updateSearchTerm,updateSelectedDate,updateAppointment}  = appointmentSlice.actions;
export const selectAppointmentList = (state) => state.appointments.appointmentList;
export const selectSearchTerm = (state) => state.appointments.searchTerm;
export const selectedDate = (state) => state.appointments.selectedDate;
export default appointmentSlice.reducer;
