import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: "off",
  alertMessages: {
    itemSold: "ITEM SOLD",
    itemDeleted: "ITEM DELETED",
    itemUpdated: "ITEM UPDATED",
    itemCreated: "ITEM CREATED",
    orderAdded: "ORDER ADDED",
    orderCompleted: "ORDER COMPLETED",
    orderDeleted: "ORDER DELETED",
    orderEdited: "ORDER EDITED",
  },
};

const alertMessagesSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    sendAlert(state, actions) {
      state.alert = actions.payload;
    },
  },
});

export const { sendAlert } = alertMessagesSlice.actions;

export default alertMessagesSlice.reducer;
