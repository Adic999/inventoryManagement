import mongoose from "mongoose";
import shopModel from "../models/shopModel.js";
import soldModel from "../models/soldModel.js";

// create Shop Item Function
export async function postShopItem(req, res) {
  try {
    if (Object.keys(req.body).length > 0) {
      if (
        typeof req.body.amount === "string" ||
        typeof req.body.costPrice === "string" ||
        typeof req.body.sellPrice === "string" ||
        typeof req.body.name === "number" ||
        typeof req.body.seller === "number"
      ) {
        res.status(400).json("INVALID TYPE ARGUMENT");
      } else {
        const item = await shopModel.find({
          $and: [
            { name: { $eq: req.body.name } },
            { user: { $eq: req.user.id } },
          ],
        });
        if (item.length > 0) {
          res.status(400).json("ITEM ALREADY EXISTS");
        } else {
          const createItem = await shopModel.create({
            ...req.body,
            user: req.user.id,
          });
          res.status(201).json(createItem);
        }
      }
    } else {
      res.status(400).json("INVALID PARAMETER");
    }
  } catch (error) {
    res.status(400).json("ERROR OCCURED WHILE CREATING ITEM");
    console.log(error);
  }
}

// get item function
export async function getShopItem(req, res) {
  try {
    console.log(req.user.id);
    const items = await shopModel.find({ user: req.user.id });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(200).json("NO ITEMS FOUND");
    }
  } catch (error) {
    res.status(400).json("ERROR OCCURED WHILE GETTING DATA");
    console.log(error);
  }
}

// delete Item function
export async function deleteShopItem(req, res) {
  try {
    if (req.params.id.length !== 24) {
      res.status(400).json("NO ITEM FOUND");
    } else {
      const item = await shopModel.find({
        $and: [{ _id: { $eq: req.params.id } }, { user: { $eq: req.user.id } }],
      });
      if (item.length > 0) {
        const id = mongoose.Types.ObjectId(req.params.id.trim());
        const deletedItem = await shopModel.findByIdAndDelete(id);
        res.status(200).json(deletedItem);
      } else {
        res.status(400).json("NO ITEM FOUND");
      }
    }
  } catch (error) {
    res.status(400).json("NO ITEM FOUND");
  }
}

// update Item function
export async function updateShopItem(req, res) {
  try {
    if (Object.keys(req.body).length > 0) {
      const item = await shopModel.find({
        $and: [{ user: { $eq: req.user.id } }, { _id: { $eq: req.params.id } }],
      });
      if (item.length > 0) {
        const updatedItem = await shopModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.status(200).json(updatedItem);
      } else {
        res.status(400).json("NO ITEM FOUND");
      }
    } else {
      res.status(400).json("CANNOT SET EMPTY ITEM");
    }
  } catch (error) {
    res.status(400).json("ERROR OCCURED WHILE UPDATING ITEM");
  }
}

export async function soldShopItem(req, res) {
  try {
    if (Object.keys(req.body).length > 0) {
      const item = await shopModel.find({
        $and: [{ user: { $eq: req.user.id } }, { _id: { $eq: req.params.id } }],
      });
      if (item.length > 0 && req.body.amount) {
        const finalAmount = item[0].amount - req.body.amount;
        // updating the amount of existing item
        const updatedItem = await shopModel.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            amount: finalAmount,
          },
          { new: true }
        );

        const soldItem = await soldModel.create({
          ...req.body,
          user: req.user.id,
        });
        res.status(201).json({ soldItem, updatedItem });
      } else {
        res.status(400).json("NO ITEM FOUND");
      }
    }
  } catch (error) {
    res.status(400).json("ERROR OCCURED WHILE SETTING SOLD ITEM");
  }
}
