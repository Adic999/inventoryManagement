import mongoose from "mongoose";

const soldSchema = mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      requierd: true,
    },
    seller: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const soldModel = mongoose.model("soldItems", soldSchema);

export default soldModel;
