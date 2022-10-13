import express from "express";

import {
  deleteShopItem,
  getShopItem,
  postShopItem,
  soldShopItem,
  updateShopItem,
} from "../controllers/shopControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/post", protect, postShopItem);
route.get("/getitems", protect, getShopItem);
route.put("/sold/:id", protect, soldShopItem);
route
  .route("/:id")
  .delete(protect, deleteShopItem)
  .put(protect, updateShopItem);

export default route;
