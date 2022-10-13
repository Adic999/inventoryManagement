import React from "react";
import "./app.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Shop from "./pages/Shop";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import DailySale from "./pages/DailySale";
import PageTitleBar from "./components/PageTitleBar";
import CreateItem from "./pages/CreateItem";
import TakeOrder from "./pages/TakeOrder";
import SeeSale from "./pages/SeeSale";
import Lunch from "./pages/Lunch";
import Dinner from "./pages/Dinner";
import PendingOrders from "./pages/PendingOrders";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <PageTitleBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dailySale" element={<DailySale />} />
            <Route path="/createItem" element={<CreateItem />} />
            <Route path="/takeOrder" element={<TakeOrder />} />
            <Route path="/seeSale" element={<SeeSale />} />
            <Route path="/lunch" element={<Lunch />} />
            <Route path="/dinner" element={<Dinner />} />
            <Route path="/pendingOrders" element={<PendingOrders />} />
            <Route path="/seeSale" element={<SeeSale />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
