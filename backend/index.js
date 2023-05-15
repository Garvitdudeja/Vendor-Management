import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import vendor from "./routes/Vendor.js";
import user from "./routes/Users.js";

const myapp = express();
myapp.use(cors({ credentials: true, origin: "http://localhost:3000" }));
myapp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
myapp.use(express.json());
myapp.use(cookieParser());
myapp.use("/api/v1/vendors", vendor);
myapp.use("/api/v1/users", user);

const connectDB = async () => {
  return new Promise((res, rej) => {
    mongoose
      .connect(process.env.MongoURI)
      .then(() => {
        console.log("DataBase Connected");
        res("working fine");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
await connectDB();
myapp.get("/", (req, res) => {
  res.cookie("jwt", "21323", { httpOnly: true, maxAge: 86400000 });
  res.json({ message: "Request Accepted" });
});
myapp.listen(process.env.PORT || 4000, () => {
  console.log("server up and Running");
});

export { myapp };
