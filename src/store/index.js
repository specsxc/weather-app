import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./unitSlice";

export const store = configureStore({
  reducer: {
    units: unitReducer,
  },
});
