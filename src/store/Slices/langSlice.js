import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "langSlice",
  initialState: { lang: "en" },
  reducers: {
    changeLanguage: (state, actions) => {
      state.lang = actions.payload;
    },
  },
});

export const { changeLanguage } = langSlice.actions;
export default langSlice.reducer;
