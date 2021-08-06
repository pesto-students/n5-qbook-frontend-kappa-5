import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    login: (state,action)=>{
      debugger;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const  {login, logout}  = doctorSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.doctor?.user;

export default doctorSlice.reducer;
