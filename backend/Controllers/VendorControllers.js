
import invoiceModel from "../Database/InvoiceModel.js";
import vendorsModel from "../Database/VendorsModel.js";

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
    const getUserInfo = await vendorsModel.findById({_id: req.id});
    if(!getUserInfo){
        return res.status(401).json({message: "Please retry Login"})
    }
    const {invoicestatus, invoiceamount, invoicecurrency, invoicedate, vendorid} = {...req.body.data}
    const addInvoice = await invoiceModel.create({});

}

export {getVendorInfo, checkVendor, addInvoice }