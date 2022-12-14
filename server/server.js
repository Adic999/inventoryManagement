import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./configfile/config.js";
import route from "./routes/userRoutes.js";
import shopRoute from "./routes/shopRoutes.js";
import dailySaleRoute from "./routes/dailySaleRoutes.js";

const server = express();
server.use(express.json());
server.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDatabase();

server.use("/api/user", route);
server.use("/api/shop", shopRoute);
server.use("/api/dailysale", dailySaleRoute);

server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
