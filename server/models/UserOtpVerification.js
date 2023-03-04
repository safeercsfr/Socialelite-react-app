import mongoose from "mongoose";

const UserOtpVerificationSchema = new mongoose.Schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expiredAt:Date,
})

const UserOtpVerification = mongoose.model("UserOtpVerification",UserOtpVerificationSchema)
export default UserOtpVerification