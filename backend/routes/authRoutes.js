// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");  // ✅ Corrected path
//   // ✅ Correct path
//   // Correct relative path
//  // Make sure the path is correct

// const router = express.Router();

// // Signup route
// router.post("/signup", async (req, res) => {
//     try {
//       const { firstName, lastName, email, mobile, username, password } = req.body;
  
//       if (!firstName || !lastName || !email || !mobile || !username || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//       }
  
//       const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//       if (existingUser) {
//         return res.status(400).json({ error: "Email or Username already exists" });
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const newUser = new User({
//         firstName,
//         lastName,
//         email,
//         mobile,
//         username,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
//       res.status(201).json({ message: "User registered successfully" });
  
//     } catch (error) {
//       console.error("Signup Error:", error); // ✅ Log the error in the console
//       res.status(500).json({ error: error.message }); // ✅ Send the actual error response
//     }
//   });

//   // login route
  
//   router.post("/login", async (req, res) => {
//     try {
//       console.log("Request Body:", req.body); // Debugging: Check incoming data
  
//       const { username, password } = req.body;
//       if (!username || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//       }
  
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(401).json({ error: "Invalid username or password" });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ error: "Invalid username or password" });
//       }
  
//       // Generate a JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
//       res.json({ message: "Login successful", token, user });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   });
  

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
router.post("/signup", async (req, res) => {
    console.log("📩 Signup Request Received:", req.body); // <-- Add this
  
    try {
        const { firstName, lastName, username, password, email, mobile } = req.body;

  
      // Validate input
      if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      
  
      //const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        username,
        password, //: hashedPassword,
        email,     // ✅ include this
        mobile,    // ✅ include this
      });
      
  
      const savedUser = await newUser.save();
      console.log("✅ User saved to DB:", savedUser); // <-- Add this
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("❌ Signup Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

    //   console.log("🔑 Password from user:", password);
    //   console.log("🔐 Hashed password in DB:", user.password);
  
  
    //   const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Raw password:", password);
console.log("🔐 Hashed password:", user.password);

const isMatch = await bcrypt.compare(password, user.password);
console.log("✅ Password match result:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password" });
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      console.error("❌ Login error:", err);
      res.status(500).json({ error: "Server error" });
     

    }
  });
  
  module.exports = router;