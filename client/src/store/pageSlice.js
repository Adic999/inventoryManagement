import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageStatus: "dashboard",
};

const pageSlice = createSlice({
  name: "PageStatus",
  initialState,
  reducers: {
    changePageStatus(state, actions) {
      state.pageStatus = actions.payload;
    },
  },
});

export const { changePageStatus } = pageSlice.actions;
export default pageSlice.reducer;
