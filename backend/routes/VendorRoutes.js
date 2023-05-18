import { Router } from "express";
import jwt from 'jsonwebtoken'
import { getVendorInfo, checkVendor,addInvoice } from "../Controllers/VendorControllers.js";

const vendorRoutes = Router();




vendorRoutes.get('/getInfo',checkVendor,getVendorInfo)

// vendorRoutes.post('/addInvoice',checkVendor,addInvoice);

export default vendorRoutes