import { configureStore } from '@reduxjs/toolkit';
import langSlice from "./Slices/langSlice"
import trackerPopOverSlice from "./Slices/trackerPopOverSlice"

const store = configureStore({
  reducer: {
    langSlice,
    trackerPopOverSlice,
  },
});

export default store;
