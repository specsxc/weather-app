import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
  name: "units",
  initialState: {
    system: "metric",
  },
  reducers: {
    setUnit: (state, action) => {
      state.system = action.payload;
    },
  },
});

export const { setUnit } = unitSlice.actions;
export default unitSlice.reducer;
