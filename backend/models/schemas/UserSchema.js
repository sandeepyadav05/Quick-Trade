// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure no duplicate emails
      match: [
        /\S+@\S+\.\S+/,
        "Please enter a valid email address",
      ], // Email format validation
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [
        /^[0-9]{10}$/,
        "Please enter a valid 10-digit mobile number",
      ], // Mobile number format validation (10 digits)
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Ensure no duplicate usernames
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Password hashing before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password only if it's modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
