import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  soldOn: false,
  updateOn: false,
  deleteOn: false,
};

const fncButtonsSlice = createSlice({
  name: "fncButtonsSlice",
  initialState,
  reducers: {
    turnOn(state, actions) {
      if (actions.payload === "sold") {
        state.soldOn = true;
        state.deleteOn = false;
        state.updateOn = false;
      } else if (actions.payload === "update") {
        state.updateOn = true;
        state.soldOn = false;
        state.deleteOn = false;
      } else if (actions.payload === "delete") {
        state.deleteOn = true;
        state.updateOn = false;
        state.soldOn = false;
      }
    },
    turnOff(state, actions) {
      if (actions.payload === "sold") {
        state.soldOn = false;
      } else if (actions.payload === "update") {
        state.updateOn = false;
      } else if (actions.payload === "delete") {
        state.deleteOn = false;
      }
    },
  },
});

export const { turnOn, turnOff } = fncButtonsSlice.actions;

export default fncButtonsSlice.reducer;
