import { configureStore } from "@reduxjs/toolkit";
import navBarSlice from "./navBarSlice";
import pageSlice from "./pageSlice";
import userSlice from "./userSlice";
import tokenSlice from "./tokenSlice";
import fncButtonsSlice from "./fncButtons";
import tempData from "./tempData";
import alert from "./alert";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import takeOrderSlice from "./takeOrder";
import itemSlice from "./item";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  navBarLinkState: navBarSlice,
  pageState: pageSlice,
  userState: userSlice,
  token: tokenSlice,
  funcState: fncButtonsSlice,
  tempData: tempData,
  itemDetail: itemSlice,
  takeOrder: takeOrderSlice,
  alert,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
