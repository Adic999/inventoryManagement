// import axios from "axios";
const axios = require("axios");

// get shopItems
export const getShopItems = async (token) => {
  try {
    const url =
      "https://inventory-management-api-001.onrender.com/api/shop/getitems";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// create Shop Items
export const createShopItem = async (token, data) => {
  try {
    const url =
      "https://inventory-management-api-001.onrender.com/api/shop/post";
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete shop items
export const deleteShopItem = async (token, id) => {
  try {
    const url = `https://inventory-management-api-001.onrender.com/api/shop/${id}`;
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// update shop Item
export const updateShopItem = async (token, data, id) => {
  try {
    const url = `https://inventory-management-api-001.onrender.com/api/shop/${id}`;
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// sold shop item
export const soldShopItem = async (token, data, id) => {
  try {
    const url = `https://inventory-management-api-001.onrender.com/api/shop/sold/${id}`;
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
