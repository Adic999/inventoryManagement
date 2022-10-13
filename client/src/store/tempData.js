import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempData: {
    id: "",
    name: "",
    amount: "",
    costPrice: "",
    sellPrice: "",
    seller: "",
  },
};

const tempData = createSlice({
  name: "tempData",
  initialState,
  reducers: {
    updateTempData(state, actions) {
      state.tempData.id = actions.payload.itemid;
      state.tempData.name = actions.payload.itemname;
      state.tempData.amount = actions.payload.itemamount;
      state.tempData.costPrice = actions.payload.itemcostPrice;
      state.tempData.sellPrice = actions.payload.itemsellPrice;
      state.tempData.seller = actions.payload.itemseller;
    },
    resetTempData(state) {
      state.tempData.id = "";
      state.tempData.name = "";
      state.tempData.amount = "";
      state.tempData.costPrice = "";
      state.tempData.sellPrice = "";
      state.tempData.seller = "";
    },
  },
});

export const { updateTempData, resetTempData } = tempData.actions;
export default tempData.reducer;
