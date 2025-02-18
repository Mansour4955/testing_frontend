import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
  },
});

export default store;
