import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: JSON.parse(localStorage.getItem("weather_favorites")) || [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const cityName = action.payload;
      const index = state.items.indexOf(cityName);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(cityName);
      }
      localStorage.setItem("weather_favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
