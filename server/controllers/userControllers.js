import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// jwt generator
const generateToken = (id) => {
  return jwt.sign({ id }, `${process.env.SECRET_KEY}`, {
    expiresIn: "1d",
  });
};

// user Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const userExist = await userModel.findOne({ email: email });
      if (userExist) {
        console.log("user already exists");
        res.json({ message: "user already exitst" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPasswod = await bcrypt.hash(password, salt);
        const user = await userModel.create({
          user: name,
          email,
          password: hashedPasswod,
        });
        const success = await user.save();
        if (success) {
          res.status(201).json({
            id: user._id,
            email,
            token: generateToken(user._id),
          });
        } else {
          res
            .status(500)
            .json({ message: "error occured while creating the user " });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "error occured while creating the user " });
  }
};

// user login

export const loginUser = async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;
      const userExist = await userModel.findOne({ email });
      if (!userExist) {
        res.status(401).json({ message: "No user found" });
      } else if (userExist) {
        const verifyPassword = await bcrypt.compare(
          password,
          userExist.password
        );
        if (!verifyPassword) {
          res.status(401).json({ message: "incorrect password" });
        } else {
          res.status(200).json({
            id: userExist._id,
            name: userExist.user,
            email: userExist.email,
            token: generateToken(userExist._id),
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "error occured while logging the user " });
  }
};
