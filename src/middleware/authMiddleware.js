const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Define the protect middleware function to secure routes
const protect = async (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user by the ID in the decoded token and exclude the password field
            req.user = await User.findById(decoded.id).select('-password');
            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If token verification fails, respond with a 401 status and an error message
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found in the authorization header
    if (!token) {
        // Respond with a 401 status and an error message
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
