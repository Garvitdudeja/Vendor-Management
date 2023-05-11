import mongoose  from "mongoose";
import bcypt from 'bcryptjs'

const VendorSchema = mongoose.Schema({
    firstName: {
        type:String,
        required : true,
        required: [true, 'Please tell us your name']
    },
    lastName: {
        type:String,
    },
    email: {
        type: String,
        required: [true, 'Please Add your Email address'],
        unique: true
    },
    phoneNumber:{
        type: String,
        required: [true, 'Please Add your Phone Number'],
        length: 10,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    address: [{
        type: String,
    }]
})


VendorSchema.pre('save',async function(next){
    if(!this.isModified('password') ) return next();
    this.password=  bcypt.hashSync(this.password,12);
})


VendorSchema.methods.comparePassword = function async(oldPassword,newPassword){
    return bcypt.compare(oldPassword,newPassword)
}

const vendorsModel = mongoose.model('vendors',VendorSchema);
export default vendorsModel;
