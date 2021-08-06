import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configData:null
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateConfig : (state,action) =>{
        state.configData = action.payload
       
    },
  },
});

export const  {updateConfig}  = settingsSlice.actions;
export const selectConfigData = (state) => state.settings.configData;
export default settingsSlice.reducer;
