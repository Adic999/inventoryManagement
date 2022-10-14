import mongoose from "mongoose";

const createMenuItem = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    choiceCurry: {
      type: Array,
    },
    curryAmount: {
      type: Number,
    },
    choiceDrink: {
      type: Array,
    },
    complementary: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const menuModel = mongoose.model("menu items", createMenuItem);

export default menuModel;
