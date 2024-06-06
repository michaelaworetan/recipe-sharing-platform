const express = require('express'); // Import the express library
const { register, login } = require('../controllers/authController'); // Import the register and login functions from the authController
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware'); // Import validation middleware for registration and login

const router = express.Router(); // Create a new router object

// Route to handle user registration
// validateRegister middleware validates the input data before calling the register controller function
router.post('/register', validateRegister, register);

// Route to handle user login
// validateLogin middleware validates the input data before calling the login controller function
router.post('/login', validateLogin, login);

module.exports = router; // Export the router object to be used in other parts of the application
 