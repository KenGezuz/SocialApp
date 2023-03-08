const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User =  require("../models/userModel");

{/*CREATE DATA */}
// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath,
      friends,
      location,
      occupation, } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
     occupation,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
    });

    await user.save();

    // Sign a JWT token for the new user
    const payload = { sub: user.id };
    const token = jwt.sign(payload,process.env.JWT_SECRET, { algorithm: 'HS256' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  {/**READ DATA */}
  // Login endpoint
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Check the password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Sign a JWT token for the authenticated user
      const payload = { sub: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' });
  
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {registerUser,loginUser};