import { Router } from "express";
import {signIn,signUp} from '../Controllers/authControllers.js'

const vendor = Router();
vendor.post("/signUp", signUp);
vendor.post("/signIn", signIn);

export default vendor;
