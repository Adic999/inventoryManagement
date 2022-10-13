import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  takeOrder: false,
  targetId: "",
  lunchReRender: false,
  dinnerReRender: false,
  pendingOrderReRender: false,
  menuItems: [],
  pendingOrders: [],
};

const takeOrderSlice = createSlice({
  name: "take order",
  initialState,
  reducers: {
    turnOnTakeOrder(state, actions) {
      if (actions.payload === "takeOrder") {
        state.takeOrder = true;
      } else if (actions.payload === "orderPending") {
        state.orderPending = true;
      }
    },
    turnOffTakeOrder(state, actions) {
      if (actions.payload === "takeOrder") {
        state.takeOrder = false;
      }
    },
    setTargetId(state, actions) {
      state.targetId = actions.payload;
    },
    setPendingOrder(state, actions) {
      state.pendingOrders = actions.payload;
    },
    setLunchReRender(state, actions) {
      state.lunchReRender = actions.payload;
    },
    setDinnerReRender(state, actions) {
      state.dinnerReRender = actions.payload;
    },
    setPendingOrderReRender(state, actions) {
      state.pendingOrderReRender = actions.payload;
    },
    setMenuItems(state, actions) {
      state.menuItems = actions.payload;
    },
  },
});
export const {
  turnOffTakeOrder,
  turnOnTakeOrder,
  setTargetId,
  setPendingOrder,
  setMenuItems,
  setLunchReRender,
  setPendingOrderReRender,
  setDinnerReRender,
} = takeOrderSlice.actions;
export default takeOrderSlice.reducer;
