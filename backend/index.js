import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';

import vendor from './routes/Vendor.js';

const myapp = express();
myapp.use(express.json());
myapp.use(cors());
myapp.use('/api/v1/vendors', vendor )

const connectDB = async()=>{
  await mongoose.connect(process.env.MongoURI).then(() => {
    console.log("DataBase Connected");
}).catch((error) => {
    console.log(error);
});
}


connectDB();


myapp.get("/", (req, res) => {
  res.json({ message: "Request Accepted" });
});
myapp.listen(process.env.PORT || 4000, () => {
  console.log("server up and Running");
});

export { myapp };
