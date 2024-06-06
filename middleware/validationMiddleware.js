const { check, validationResult } = require('express-validator');

// Validate registration input
exports.validateRegister = [
    // Check if 'username' is not empty and provide an error message if it is
    check('username').not().isEmpty().withMessage('Username is required'),
    // Check if 'email' is a valid email address and provide an error message if it is not
    check('email').isEmail().withMessage('Valid email is required'),
    // Check if 'password' is at least 6 characters long and provide an error message if it is not
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    // Middleware function to handle validation result
    (req, res, next) => {
        // Extract validation errors from the request
        const errors = validationResult(req);
        // If there are validation errors, send a 422 status code with the errors array
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // If validation passes, proceed to the next middleware or route handler
        next();
    }
];

// Validate login input
exports.validateLogin = [
    // Check if 'email' is a valid email address and provide an error message if it is not
    check('email').isEmail().withMessage('Valid email is required'),
    // Check if 'password' is not empty and provide an error message if it is
    check('password').not().isEmpty().withMessage('Password is required'),
    // Middleware function to handle validation result
    (req, res, next) => {
        // Extract validation errors from the request
        const errors = validationResult(req);
        // If there are validation errors, send a 422 status code with the errors array
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // If validation passes, proceed to the next middleware or route handler
        next();
    }
];
