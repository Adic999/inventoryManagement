import menuItems from "../models/createMenuItems.js";
import pendingOrdersModel from "../models/createPendingOrders.js";
import completePendingOrderModel from "../models/completePendingOrder.js";

import mongoose from "mongoose";

// create menu items
export async function createMenuItemsFunction(req, res) {
  try {
    if (Object.keys(req.body).length > 0) {
      const checkItem = await menuItems.find({
        $and: [
          { name: { $eq: req.body.name } },
          { user: { $eq: req.user.id } },
          { category: { $eq: req.body.category } },
        ],
      });
      if (checkItem.length > 0) {
        res.status(400).json("MENU ITEM ALREADY EXISTS");
      } else {
        const createItem = await menuItems.create({
          ...req.body,
          user: req.user.id,
        });

        res.status(201).json(createItem);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("ERROR OCCURED WHILE CREATING MENU ITEM");
  }
}

// get menu items
export async function getMenuItems(req, res) {
  try {
    const items = await menuItems.find({
      user: req.user.id,
    });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(200).json("NO ITEM FOUND");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("NO ITEM FOUND");
  }
}

// create pending orders
export async function createPendingOrdersFunction(req, res) {
  try {
    const createPendingOrder = await pendingOrdersModel.create({
      ...req.body,
      user: req.user.id,
    });
    const success = await createPendingOrder.save();
    if (success) {
      res.status(200).json(createPendingOrder);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("SOMETHING WENT WRONG WHILE CREATING PENDING ORDERS");
  }
}

// get pending orders
export async function getPendingOrdersFunction(req, res) {
  try {
    const pendingOrders = await pendingOrdersModel.find({
      user: req.user.id,
    });
    res.status(200).json(pendingOrders);
  } catch (error) {
    console.log(error);
    res.status(400).json("SOMETHING WENT WRONG WHILE GETTING PENDING ORDERS");
  }
}

// delete pending orders
export async function deletePendingOrderFunction(req, res) {
  try {
    if (req.params.id.length !== 24) {
      res.status(400).json("NO ITEM FOUND");
    } else {
      const item = await pendingOrdersModel.find({
        $and: [{ _id: { $eq: req.params.id } }, { user: { $eq: req.user.id } }],
      });
      if (item.length > 0) {
        const id = mongoose.Types.ObjectId(req.params.id.trim());
        const deletedItem = await pendingOrdersModel.findByIdAndDelete(id);
        res.status(200).json(deletedItem);
      } else {
        res.status(400).json("NO ITEM FOUND");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("SOMETHING WENT WRONG WHILE DELETING PENDING ORDERS");
  }
}

// complete pending Order
export async function completePendingOrder(req, res) {
  try {
    if (req.params.id.length !== 24) {
      res.status(400).json("NO ITEM FOUND");
    } else {
      const orderSearch = await pendingOrdersModel.findOne({
        $and: [{ _id: { $eq: req.params.id } }, { user: { $eq: req.user.id } }],
      });
      if (Object.keys(orderSearch).length > 0) {
        const {
          user,
          name,
          curry1,
          curry2,
          price,
          amount,
          spiceLevel,
          drink,
          complementary,
          _id,
        } = orderSearch;
        const completeOrder = await completePendingOrderModel.create({
          user,
          name,
          curry1,
          curry2,
          amount,
          spiceLevel,
          drink,
          complementary,
          price,
        });
        await completeOrder.save();
        const deletePendingOrder = await pendingOrdersModel.findByIdAndDelete(
          _id
        );
        res.status(200).json(deletePendingOrder);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("SOMETHING WENT WRONG WHILE COMPLETING ORDER");
  }
}

// edit pending orders
export async function editPendingOrder(req, res) {
  try {
    const orderSearch = await pendingOrdersModel.findOne({
      $and: [{ _id: { $eq: req.params.id } }, { user: { $eq: req.user.id } }],
    });
    if (orderSearch) {
      const updateOrder = await pendingOrdersModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body }
      );
      if (Object.keys(updateOrder).length > 0) {
        res.status(200).json(updateOrder);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("SOMETHING WENT WRONG WHILE EDITING THE ORDER");
  }
}

// get completed orders
export async function getCompletedOrders(req, res) {
  try {
    const items = await completePendingOrderModel.find({
      user: req.user.id,
    });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(200).json("NO ITEM FOUND");
    }
  } catch (error) {
    res
      .status(400)
      .json("SOMETHING WENT WRONG WHILE FETCHING COMPLETED ORDERS");
  }
}
