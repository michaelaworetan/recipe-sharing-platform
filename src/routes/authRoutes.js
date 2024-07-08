const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');   // Import the registerUser, loginUser, and getUserProfile functions from authController
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware to secure certain routes

// Defined a POST route for user registration
router.post('/register', registerUser); // When a POST request is made to /register, call the registerUser controller function

// Defined a POST route for user login
router.post('/login', loginUser);   // When a POST request is made to /login, call the loginUser controller function

// Defined a GET route for fetching the user profile
router.get('/profile', protect, getUserProfile);
// When a GET request is made to /profile, first call the protect middleware to check authentication
// If the user is authenticated, call the getUserProfile controller function

module.exports = router;
