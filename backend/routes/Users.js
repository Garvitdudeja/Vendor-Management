import { Router } from "express";
import jwt from 'jsonwebtoken'
import { getUserInfo } from "../Controllers/UserControllers.js";

const user = Router();

const checkUser = async (req,res,next)=>{
    try{
    const id =jwt.verify(req.cookies.jwt.split(' ')[1], process.env.JWTSecret).id;
    req.id = id;
    next();
    }catch(error){
        return res.json({error:error.message,"success":false})
    }
}


user.get('/getInfo',checkUser,getUserInfo)

export default user