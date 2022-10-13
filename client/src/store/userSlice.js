import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loggedIn: false,
};

const userSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    changeToLoggedIn(state) {
      state.loggedIn = true;
    },
    changeToLoggedOut(state) {
      state.loggedIn = false;
    },
  },
});

export const { changeToLoggedIn, changeToLoggedOut } = userSlice.actions;
export default userSlice.reducer;
