// Creating Recipe model
// Import the mongoose module
const mongoose = require('mongoose');

// Define the recipe schema with various fields
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title field is required
    },
    ingredients: {
        type: [String], // Ingredients field is an array of strings
        required: true, // Ingredients field is required
    },
    instructions: {
        type: String,
        required: true, // Instructions field is required
    },
    image: {
        type: String, // Optional field for image URL
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // Establish a reference to the User collection
        required: true, // User field is required
    },
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId, // Reference to the User model for rating
                ref: 'User', // Establish a reference to the User collection
            },
            rating: {
                type: Number, // Rating is a number
                required: true, // Rating field is required
            },
        }
    ]
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create the Recipe model using the recipe schema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Export the Recipe model
module.exports = Recipe;
