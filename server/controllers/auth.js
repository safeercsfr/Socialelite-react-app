import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
// import sendEmail from "../utils/sendEmail.js";
// import Token from "../models/token.js";
// import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// import UserOtpVerification from "../models/UserOtpVerification.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// REGISTER USER
export const register = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ProfileImage",
    });
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    // Add input validation rules
    await Promise.all([
      body("firstName")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("First name must contain only letters")
        .run(req),
      body("lastName")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Last name must contain only letters")
        .run(req),
      body("email").isEmail().withMessage("Invalid email address").run(req),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .run(req),
      body("location")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("location must contain only letters")
        .run(req),
      body("occupation")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("occupation must contain only letters")
        .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: ["User Already Exists!"] });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: result.secure_url,
      friends,
      location,
      occupation,
      viewProfile: Math.ceil(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROFILE PHOTO
export const updateProPic = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ProfileImage",
    });
    console.log(result, "lll");
    const picturePath = result.secure_url;
    const { id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { picturePath },
      { new: true }
    );
    console.log(updatedUser, "updatedUser");
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error Occured" });
  }
};

/*EMAIL VERIFICATION*/

export const sendPasswordLink = async (req, res) => {

  console.log(req.body);
  const {email} = req.body

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await User.findOne({ email: email });
    
    const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
      expiresIn: "120s",
    });
    
    const setusertoken = await User.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );
  
    if (setusertoken) {
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "Sending Email For password Reset",
        text: `This link valid for 2 minutes http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
      }
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error hlooo", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Successfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
};

export const forgotpassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

export const changepassword = async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);

      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
