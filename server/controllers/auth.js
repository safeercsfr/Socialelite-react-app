import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {folder:"ProfileImage"});
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath:result.secure_url,
      friends,
      location,
      occupation,
      viewProfile: Math.ceil(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "User Already Exists!" });
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
    const result = await cloudinary.uploader.upload(req.file.path, {folder:"ProfileImage"} );
    console.log(result,'lll');
    const picturePath = result.secure_url
    const { id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { picturePath },
      { new: true }
    );
    console.log(updatedUser,'updatedUser');
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error Occured" });
  }
};
