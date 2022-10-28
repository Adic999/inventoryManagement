import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: "off",
  loading: false,
  alertMessages: {
    itemSold: "ITEM SOLD",
    itemDeleted: "ITEM DELETED",
    itemUpdated: "ITEM UPDATED",
    itemCreated: "ITEM CREATED",
    orderAdded: "ORDER ADDED",
    orderCompleted: "ORDER COMPLETED",
    orderDeleted: "ORDER DELETED",
    orderEdited: "ORDER EDITED",
    wrongCredentials: "WRONG CREDENTIALS",
    emptyFields: "EMPTY FIELDS",
    welcome: "WELCOME",
    differentPasswords: "Passwords do not match",
    alreadyExists: "user already exists",
    generalAlert: "UNKNOWN ERROR OCCURED",
  },
};

const alertMessagesSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    sendAlert(state, actions) {
      state.alert = actions.payload;
    },
    isLoading(state, actions) {
      state.loading = actions.payload;
    },
  },
});

export const { sendAlert, isLoading } = alertMessagesSlice.actions;

export default alertMessagesSlice.reducer;
