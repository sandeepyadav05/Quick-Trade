// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure no duplicate emails
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'], // Email validation regex
    },
    mobile: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid mobile number'],
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate usernames
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Hash password before saving to the database (using bcrypt)
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
  }
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
