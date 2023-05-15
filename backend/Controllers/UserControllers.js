
import vendorsModel from "../Database/VendorsModel.js";

const getUserInfo = async(req,res)=>{
try{
const response = await  vendorsModel.findById({_id: req.id});
if (!response){
    return res.json({error: "No user Found Please Login First"});
}
return res.json({data: response,success: true})
}
catch(error){
return res.status(400).json({message: error.message})
}    
}

export {getUserInfo }