import jwt from 'jsonwebtoken'
import invoiceModel from "../Database/InvoiceModel.js";
import vendorsModel from "../Database/VendorsModel.js";
import mongoose from 'mongoose';

//checking the Venodr from the cookies received from the frontend
const checkVendor = async (req,res,next)=>{
    try{
    if(!req.cookies.jwt){
        return res.status(401).json({error: "please Login First"});
    }
    const id =jwt.verify(req.cookies.jwt.split(' ')[1], process.env.JWTSecret).id;
    req.id = id;
    next();
    }catch(error){
        return res.status(401).json({error:error.message,"success":false})
    }
}



//Getting the Vendor Info from the database by Id
const getVendorInfo = async(req,res)=>{
try{
const response = await  vendorsModel.findById({_id: req.id});
if (!response){
    return res.status(400).json({error: "No Vendor Found Please Login First"});
}
return res.json({data: response,success: true})
}
catch(error){
return res.status(400).json({message: error.message})
}    
}

//Adding a invoice
const addInvoice = async(req,res)=>{
const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const getUserInfo = await vendorsModel.findById({_id: req.id}).session(session);
        const { invoiceamount, invoicecurrency, invoicedate} = {...req.body.data}
        const addInvoice = await invoiceModel.create([{invoiceamount,invoicecurrency,vendorid:req.id,invoicedate}],{session});
        const addToVendor = await vendorsModel.findByIdAndUpdate({_id:req.id},{$push:{Invoices: addInvoice[0]._id}},{new:true}).session(session);
        if(addToVendor==null){
            throw new Error("No Such User Exist");
        }
        session.commitTransaction();
    res.json({message:"Invoice sucessfully added",response:addToVendor})
    }catch(error){
        // console.log("here")
        session.abortTransaction();
        return res.status(406).json({error:error.message})
    }finally{
        // session.endSession()
    }

}

export {getVendorInfo, checkVendor, addInvoice }