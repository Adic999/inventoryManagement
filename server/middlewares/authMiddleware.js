import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export async function protect(req, res, next) {
  try {
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    // spliting token in the header
    const token = req.headers.authorization.split(" ")[1];
    // verify if the token received is valid or not
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // get user details from database if exists excluding password
    req.user = await userModel.findById(decoded.id).select("-password");
    if (req.user) {
      next();
    } else {
      res.status(401).json("user not found");
    }
  } catch (error) {
    res.status(401).json("Not authorized");
  }
}
