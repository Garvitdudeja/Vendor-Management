import vendorsModel from "../Database/VendorsModel.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  maxAge: 86400000,
  sameSite: "lax",
  secure: false,
};

function generateJWT(vendor) {
  return new Promise((resolve, reject) => {
    resolve(
      "Bearer " +
        jwt.sign({ id: vendor._id }, process.env.JWTSecret, {
          expiresIn: "10d",
        })
    );
  });
}

const signIn = async (req, res, next) => {
  try {
    const { Email, Password } = req.body.data;
    const vendor = await vendorsModel
      .findOne({ PrimaryEmailID: Email })
      .select("+Password");
    if (!vendor || !await vendor.comparePassword(Password, vendor.Password)) {
      return res
        .status(400)
        .json({ message: "Please check or Email address or Password" });
    }
    let token = await generateJWT(vendor);
    res.cookie("jwt", token, cookieOptions);
    res
      .json({
        message: "Successfully Loged in",
        token,
      })
      .status(200);
  } catch (error) {
    return res.status(401).json({ error_message: error.message });
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
    res.status(400).json({ error_message: error.message, sucess: false });
  }
};

const signOut = (req, res) => {
  res.clearCookie("jwt");
  res.end();
};

export { signIn, signUp, signOut };
