const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    // User field, references the User model, and is required
    user: { 
        type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
        ref: 'User', // Reference to the User model
        required: true 
    },
    title: { 
        type: String, // Data type is String
        required: true 
    },
    ingredients: { 
        type: [String], // Data type is an array of Strings
        required: true 
    },
    instructions: { 
        type: String, // Data type is String
        required: true 
    },
    image: { 
        type: String // Data type is String
    },
    category: { 
        type: String, // Data type is String
        required: true 
    },
    cuisine: { 
        type: String, // Data type is String
        required: true // This field is required
    },
    // Reviews field, an array of objects, each with user, rating, and comment
    reviews: [
        {
            // User field within reviews, references the User model
            user: { 
                type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
                ref: 'User' // Reference to the User model
            },
            // Rating field within reviews, required
            rating: { 
                type: Number, // Data type is Number
                required: true
            },
            // Comment field within reviews, required
            comment: { 
                type: String, 
                required: true 
            },
        },
    ],
    // Ratings field, defaults to 0
    ratings: { 
        type: Number, // Data type is Number
        default: 0 // Default value is 0
    },
});

// Create a mongoose model named 'Recipe' based on the RecipeSchema
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
