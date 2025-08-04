const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadToCloudinary } = require('../middlewares/upload.middleware');

const JWT_SECRET = process.env.JWT_SECRET || 'Qw3rT!9zXy7$Lp0vBn6@eFgH#jKl2^sDf';

// Sign Up
exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || !req.file) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Validate password
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters and contain letters and numbers.' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    
    // Upload profile image to Cloudinary
    const result = await uploadToCloudinary(req.file, 'blog-app/profiles');
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user
    const user = new User({
      email,
      password: hashedPassword,
      profileImage: result.secure_url
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '5d' });
    res.json({ token, user: { email: user.email, profileImage: user.profileImage } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
