// Creating authController
// Import the User model and required modules
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body; // Extract name, email, and password from the request body
    try {
        // Create a new user with the provided details
        const user = await User.create({ name, email, password });

        // Generate a JWT token for the new user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Send the token as a response with a 201 status code
        res.status(201).json({ token });
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from the request body
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists and the password is correct
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate a JWT token for the authenticated user
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            // Send the token as a response
            res.json({ token });
        } else {
            // Send a 401 status code with an error message for invalid credentials
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};
