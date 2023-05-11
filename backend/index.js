// import dotenv from 'dotenv'
// dotenv.config()
// import express from "express";
// import cors from 'cors';
// import mongoose from "mongoose";
// import vendor from './routes/Vendor.js';

// const myapp = express();
// myapp.use(express.json());
// myapp.use(cors());
// myapp.use('/api/v1/vendors', vendor )

// await mongoose.connect(process.env.MongoURI).then(()=>{
//     console.log('DataBase Connected');
// }).catch((error)=>{console.log(error)});




import express from 'express';

const Tiger = express();

Tiger.get("/",(req,res)=>{
    res.json({message: "Request Accepted"})
})



Tiger.listen(4000,()=>{console.log("worked")});

export {Tiger};