import { Router } from "express";
import {signIn,signUp} from '../Controllers/authControllers.js'
import multer from "multer";

const fileStroage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./images')
  },
  filename : (req,file,cb)=>{
    cb(null, Date.now + '--'+ file.orignalname)
  }
})


const upload  = multer({dest: "./images"})

const vendor = Router();


vendor.post("/signUp", upload.array('images',9), signUp);
vendor.post("/signIn", signIn);

export default vendor;
