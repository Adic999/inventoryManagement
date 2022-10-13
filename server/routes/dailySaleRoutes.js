import express from "express";
import {
  completePendingOrder,
  createMenuItemsFunction,
  createPendingOrdersFunction,
  deletePendingOrderFunction,
  editPendingOrder,
  getCompletedOrders,
  getMenuItems,
  getPendingOrdersFunction,
} from "../controllers/menuControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/createItem", protect, createMenuItemsFunction);
route.get("/getItems", protect, getMenuItems);
route.post("/createPendingOrders", protect, createPendingOrdersFunction);
route.get("/getPendingOrders", protect, getPendingOrdersFunction);
route.put("/update/:id", protect, editPendingOrder);
route.get("/getCompletedOrders", protect, getCompletedOrders);
route
  .route("/:id")
  .delete(protect, deletePendingOrderFunction)
  .put(protect, completePendingOrder);
export default route;
