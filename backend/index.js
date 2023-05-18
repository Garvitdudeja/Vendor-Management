import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from './Utils/cors.js'
import vendorAuthenticate from "./routes/Authentication/VendorAuthenticate.js";
import vendorRoutes from "./routes/VendorRoutes.js";

const myapp = express();
myapp.use(cors(corsOptions));
// myapp.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

myapp.use(express.json());
myapp.use(cookieParser());
myapp.use("/api/v1/vendors/auth", vendorAuthenticate);
myapp.use("/api/v1/vendors", vendorRoutes);

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
