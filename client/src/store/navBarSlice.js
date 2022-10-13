import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkstate: "register",
};

const navBarSlice = createSlice({
  name: "linkState",
  initialState,
  reducers: {
    changeToLogIn(state) {
      state.linkstate = "login";
    },
    changeToLogOut(state) {
      state.linkstate = "logout";
    },
    changeToRegister(state) {
      state.linkstate = "register";
    },
  },
});

export const { changeToLogIn, changeToLogOut, changeToRegister } =
  navBarSlice.actions;
export default navBarSlice.reducer;
