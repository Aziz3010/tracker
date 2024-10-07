import { createSlice } from "@reduxjs/toolkit";

const trackerPopOverSlice = createSlice({
  name: "trackerPopOverSlice",
  initialState: { trackerPopOverState: false },
  reducers: {
    changeTrackerPopOverState: (state, actions) => {
      state.trackerPopOverState = actions.payload;
    },
  },
});

export const { changeTrackerPopOverState } = trackerPopOverSlice.actions;
export default trackerPopOverSlice.reducer;
