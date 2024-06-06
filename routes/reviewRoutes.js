const express = require('express'); // Import the express library
const { createReview, getReviews } = require('../controllers/reviewController'); // Import review controller functions
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware for route protection

const router = express.Router({ mergeParams: true }); // Create a new router object with mergeParams option set to true

// Define routes for reviews

// Route to handle getting all reviews and creating a new review for a specific recipe
router.route('/')
    .get(getReviews) // GET request to '/' calls the getReviews function to retrieve all reviews for a specific recipe
    .post(protect, createReview); // POST request to '/' calls the createReview function to create a new review for a specific recipe, protected by the protect middleware

module.exports = router; // Export the router object to be used in other parts of the application
