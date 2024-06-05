// Creating review model
// Import the mongoose module
const mongoose = require('mongoose');

// Define the review schema with various fields
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // Establish a reference to the User collection
        required: true // User field is required
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Recipe model
        ref: 'Recipe', // Establish a reference to the Recipe collection
        required: true // Recipe field is required
    },
    comment: {
        type: String, // Comment field is a string
        required: true // Comment field is required
    },
    rating: {
        type: Number, // Rating is a number
        required: true // Rating field is required
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create the Review model using the review schema
const Review = mongoose.model('Review', reviewSchema);

// Export the Review model
module.exports = Review;
