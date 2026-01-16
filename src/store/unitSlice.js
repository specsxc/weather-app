import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
  name: "units",
  initialState: {
    system: localStorage.getItem("unitSystem") || "metric",
  },
  reducers: {
    setUnit: (state, action) => {
      state.system = action.payload;
      localStorage.setItem("unitSystem", action.payload);
    },
  },
});

export const { setUnit } = unitSlice.actions;
export default unitSlice.reducer;
