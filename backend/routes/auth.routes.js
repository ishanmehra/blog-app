const express = require('express');
const router = express.Router();
const { signUp, login, signUpLimiter, loginLimiter } = require('../controllers/auth.controller');
const { uploadProfile } = require('../middlewares/upload.middleware');

// Sign Up
router.post('/signup', signUpLimiter, uploadProfile.single('profileImage'), signUp);

// Login
router.post('/login', loginLimiter, login);

module.exports = router;
