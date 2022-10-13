import mongoose from "mongoose";

const completePendingOrderSchema = mongoose.Schema(
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
    curry1: {
      type: String,
    },
    curry2: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    spiceLevel: {
      type: Number,
    },
    drink: {
      type: String,
    },
    complementary: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const completePendingOrderModel = mongoose.model(
  "complete orders",
  completePendingOrderSchema
);

export default completePendingOrderModel;
