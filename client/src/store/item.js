import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  choiceCurry: ["Chicken", "Keema", "Mutton", "Vegetable"],
  choiceDrink: ["Lassi", "MangoLassi", "HotChai", "IceTea"],
  complementary: "Soup and Salad",
  categories: ["Lunch", "Dinner"],
};

const itemSlice = createSlice({
  name: "item details",
  initialState,
  reducers: {},
});

export default itemSlice.reducer;
