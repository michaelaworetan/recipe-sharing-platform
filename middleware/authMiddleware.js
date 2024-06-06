// The middleware function protect is designed to protect routes by verifying the JWT token in the request headers.
// Import jwt for token verification and User model for database interaction
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    // Check if the authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token using the JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Find the user by decoded token ID and exclude the password field
            req.user = await User.findById(decoded.id).select('-password');
            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // Handle errors related to token verification
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }
    // If no token is found, send a 401 status code with an error message
    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

// Export the protect middleware function
module.exports = protect;
