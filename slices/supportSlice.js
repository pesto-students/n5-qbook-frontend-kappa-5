import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supportData:null
};

export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    addQuery: (state,action) =>{
        state.supportData = action.payload 
    },
  },
});

export const  {addQuery}  = supportSlice.actions;
export const selectSupportData = (state) => state.support.supportData;
export default supportSlice.reducer;
