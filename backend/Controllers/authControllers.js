import vendorsModel from "../Database/VendorsModel.js";
import jwt from "jsonwebtoken";

function generateJWT(vendor) {
  return new Promise((resolve, reject) => {
    resolve("Bearer " + jwt.sign({ id: vendor._id }, process.env.JWTSecret));
  });
}

const signIn = async (req, res, next) => {
  try {
    const { Email, Password } = req.body.data;
    const vendor = await vendorsModel.findOne({ Email }).select("+password");
    if (!vendor && !vendor.comparePassword(password, vendor.password)) {
      res.json({ message: "Please check or Email address or Password" });
    }
    res
      .json({
        message: "Successfully Loged in",
        token: await generateJWT(vendor),
      })
      .status(200);
  } catch (error) {
    res.json({ error: error.message }).status(200);
  }
};

const signUp = async (req, res, next) => {
  try {
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
    res.json({ message: vendor, token: await generateJWT(vendor) }).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message,sucess: false });
  }
};

export { signIn, signUp };
