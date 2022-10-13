import axios from "axios";

// create menu items
export async function createMenuItem(token, data) {
  const url = "http://localhost:3001/api/dailysale/createItem";
  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// get menu items
export async function getMenuItems(token) {
  const url = "http://localhost:3001/api/dailysale/getItems";
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// create pending orders
export async function createPendingOrders(token, data) {
  const url = "http://localhost:3001/api/dailysale/createPendingOrders";
  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// get pending orders
export async function getPendingOrders(token) {
  const url = "http://localhost:3001/api/dailysale/getPendingOrders";
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// delete pending order
export async function deletePendingOrder(token, id) {
  const url = `http://localhost:3001/api/dailysale/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// complete pending order
export async function completePendingOrder(token, id) {
  const url = `http://localhost:3001/api/dailysale/${id}`;
  try {
    const response = await axios.put(url, undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
// update pending order
export async function updatePendingOrder(token, data, id) {
  const url = `http://localhost:3001/api/dailysale/update/${id}`;
  try {
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

// get completed orders
export async function getCompletedOrders(token) {
  const url = "http://localhost:3001/api/dailysale/getCompletedOrders";
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
