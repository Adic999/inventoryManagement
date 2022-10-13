import express from "express";
import { registerUser, loginUser } from "../controllers/userControllers.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);

export default route;
