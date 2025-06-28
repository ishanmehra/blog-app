const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/auth.controller');
const { uploadProfile } = require('../middlewares/upload.middleware');

// Sign Up
router.post('/signup', uploadProfile.single('profileImage'), signUp);

// Login
router.post('/login', login);

module.exports = router;
