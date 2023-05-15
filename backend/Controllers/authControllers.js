import vendorsModel from "../Database/VendorsModel.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  expiers: new Date(Date.now + 10 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.enviroment=='Production' ? true : false,
};

function generateJWT(vendor) {
  return new Promise((resolve, reject) => {
    resolve("Bearer " + jwt.sign({ id: vendor._id }, process.env.JWTSecret,cookieOptions));
  });
}

const signIn = async (req, res, next) => {
  try {
    const { Email, Password } = req.body.data;
    const vendor = await vendorsModel.findOne({ PrimaryEmailID:Email }).select("+Password");
    if (!vendor && !vendor.comparePassword(Password, vendor.password)) {
      res.json({ message: "Please check or Email address or Password" });
    }
    let token = await generateJWT(vendor);
    res.cookie("jwt", token, {expiresIn:'10d'});
    res
      .json({
        message: "Successfully Loged in",
        token,
      })
      .status(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signUp = async (req, res, next) => {
  try {
    console.log(req.file);
    const {
      NameOfTheCompany,
      Address,
      Street,
      State,
      PinCode,
      ContactPersonName,
      PrimaryMobileNumber,
      SecondaryMobileNumber,
      PrimaryEmailID,
      SecondaryEmailID,
      BankName,
      BankAddress,
      BankAccountNumber,
      BankIFSCCode,
      TypeOfVendor,
      FrequencyBillSubmission,
      GSTInputCred,
      TDSApplicabilityType,
      LowerTDSCertificate,
      LowerTaxDeductionCertificate,
      PurchaseOfService,
      Password,
    } = { ...req.body.data };
    const vendor = await vendorsModel.create({
      NameOfTheCompany,
      Address,
      Street,
      State,
      PinCode,
      ContactPersonName,
      PrimaryMobileNumber,
      SecondaryMobileNumber,
      PrimaryEmailID,
      SecondaryEmailID,
      BankName,
      BankAddress,
      BankAccountNumber,
      BankIFSCCode,
      TypeOfVendor,
      FrequencyBillSubmission,
      GSTInputCred,
      TDSApplicabilityType,
      LowerTDSCertificate,
      LowerTaxDeductionCertificate,
      PurchaseOfService,
      Password,
    });
    await vendor.save();
    let token = await generateJWT(vendor);

    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ message: vendor, token });
  } catch (error) {
    res.status(400).json({ message: error.message, sucess: false });
  }
};

export { signIn, signUp };
