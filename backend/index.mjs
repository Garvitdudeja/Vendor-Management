import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import vendor from './routes/Vendor.js';

const myapp = express();
myapp.use(express.json());
myapp.use(cors());
// myapp.use('/api/v1/vendors', vendor )


  await mongoose
    .connect("mongodb+srv://dudejagarvit3:Garvit1839@cluster0.aa2bbme.mongodb.net/")
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch((error) => {
      console.log(error);
    });


myapp.get("/", (req, res) => {
  res.json({ message: "Request Accepted" });
});
myapp.listen(4000, () => {
  console.log("server up and Running");
});

export { myapp };