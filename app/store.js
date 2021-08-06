import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "../slices/doctorSlice";
import settingsReducer from "../slices/settingsSlice"
import appointmentReducer from "../slices/appointmentSlice";
export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    settings:settingsReducer,
    appointments:appointmentReducer
  },
});
