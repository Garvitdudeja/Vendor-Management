
import vendorsModel from "../Database/VendorsModel.js";
import jwt from "jsonwebtoken";

function generateJWT(vendor){
    return new Promise((resolve,reject) => {
        resolve("Bearer "+jwt.sign({id: vendor._id},process.env.JWTSecret));
    })

    }


const signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body.data;
      const vendor = await vendorsModel.findOne({ email }).select("+password");
      if (!vendor && !vendor.comparePassword(password,vendor.password)) {
        res.json({ message: "Please check or Email address or Password" });
      }
      res.json({message:"Successfully Loged in", token: await generateJWT(vendor)}).status(200);
      
    } catch (error) {
      res.json({ error: error.message }).status(200);
    }
  }

const signUp = async (req, res, next) => {
    try {
      const vendor = await vendorsModel.create(req.body.data);
      await vendor.save();
      res.json({ message: vendor, token: await generateJWT(vendor) }).status(200);
    } catch (error) {
      res.json({ error: error.message }).status(200);
    }
  }

export {signIn,signUp}