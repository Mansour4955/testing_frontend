import { createSlice } from "@reduxjs/toolkit";

const initialState = { mode: "light" };
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});
export const { setMode } = settingsSlice.actions;
export default settingsSlice.reducer;
