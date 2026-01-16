import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./unitSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    units: unitReducer,
    favorites: favoritesReducer,
  },
});
