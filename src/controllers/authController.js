const User = require('../models/User');

// Import jwt for generating JSON Web Tokens
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (id) => {
    // Sign a JWT token with the user id, using the secret from environment variables and setting an expiration time of 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user // @route   POST /api/users/register // @access  Public
const registerUser = async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });

    // If user exists, return a 400 status with an error message
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with the provided username, email, and password
    const user = await User.create({ username, email, password });

    // If user creation is successful, return user details and a token
    if (user) {
        res.status(201).json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
    } else {
        // If user creation fails, return a 400 status with an error message
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token // @route   POST /api/users/login // @access  Public
const loginUser = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user exists and the password matches, return user details and a token
    if (user && (await user.matchPassword(password))) {
        res.json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
    } else {
        // If authentication fails, return a 401 status with an error message
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get user profile // @route   GET /api/users/profile // @access  Private
const getUserProfile = async (req, res) => {
    // Find user by id (retrieved from the authentication middleware)
    const user = await User.findById(req.user.id);
    // If user is found, return user details
    if (user) {
        res.json({ _id: user._id, username: user.username, email: user.email });
    } else {
        // If user is not found, return a 404 status with an error message
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
