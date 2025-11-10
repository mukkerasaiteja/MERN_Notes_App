import express from "express";
import userModel from "../models/userModel.js";
import auth from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

const router = express.Router();

//Register User route with hashed password and salting
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all the fields." });
  }

  // Check if user already exists
  const userExists = await userModel.findOne({
    email: email,
  });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists. Please login." });
  }

  // Create user
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});

//Login User route with decrypting and verifying

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(401).json({
        msg: "User not found. Please sign up.",
      });
    }

    // Check if the password matches
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        msg: "Invalid credentials. Please try again.",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.json({
      token: token,
      username: user.username,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      msg: "Server error, please try again later.",
    });
  }
});

router.get("/me", auth, (req, res) => {
  res.status(200).json({
    username: req.user.username,
    email: req.user.email,
    _id: req.user._id,
  });
});

export default router;
