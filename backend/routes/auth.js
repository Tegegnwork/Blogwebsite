const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is required");
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.Username,
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Return user info and token
    res.json({
      message: "Login successful",
      token,
      user: {
        id: foundUser._id,
        username: foundUser.Username,
        email: foundUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists (by email or username)
    const existingUser = await User.findOne({
      $or: [{ email }, { Username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "Email already registered"
            : "Username already taken",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      Username: username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Return user info without password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.Username,
        email: newUser.email,
      },
    });
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
