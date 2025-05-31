const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Replace this with your secret key from env variables
const JWT_SECRET = "your_jwt_secret_key";

// Register route
router.post('/register', async (req, res) => {
  let {
    name,
    email,
    password,
    phone,
    residenceType,
    monthlyIncome,
    previousLoan,
    maritalStatus,
    numberOfDependents,
    city,
    state
  } = req.body;

  // Convert previousLoan to Boolean
  if (typeof previousLoan === 'string') {
    const val = previousLoan.toLowerCase();
    if (val === 'yes' || val === 'true') {
      previousLoan = true;
    } else if (val === 'no' || val === 'false' || val === 'np') {
      previousLoan = false;
    } else {
      previousLoan = false; // default fallback
    }
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({
      name,
      email,
      password,
      phone,
      residenceType,
      monthlyIncome,
      previousLoan,
      maritalStatus,
      numberOfDependents,
      city,
      state
    });

    await user.save();

    // Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Example in your POST /register or wherever you create user
const { previousLoan, ...otherFields } = req.body;

// Normalize previousLoan to boolean
let previousLoanBool;
if (typeof previousLoan === "string") {
  previousLoanBool = previousLoan.toLowerCase() === "yes" || previousLoan.toLowerCase() === "true";
} else if (typeof previousLoan === "boolean") {
  previousLoanBool = previousLoan;
} else {
  previousLoanBool = false; // default fallback
}

const newUser = new User({
  ...otherFields,
  previousLoan: previousLoanBool,
});


module.exports = router;
