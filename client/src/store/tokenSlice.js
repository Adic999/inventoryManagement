import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    registerToken(state, actions) {
      state.token = actions.payload;
    },
    deleteToken(state) {
      state.token = "";
    },
  },
});

export const { registerToken, deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer;
