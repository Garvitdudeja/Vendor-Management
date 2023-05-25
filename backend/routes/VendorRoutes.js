import { Router } from "express";
import { getVendorInfo, checkVendor,addInvoice } from "../Controllers/VendorControllers.js";

const vendorRoutes = Router();




vendorRoutes.get('/getInfo',checkVendor,getVendorInfo)

vendorRoutes.post('/addInvoice',checkVendor,addInvoice);

export default vendorRoutes