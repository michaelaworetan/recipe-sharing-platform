// creating reviewController
// Import the Review and Recipe models
const Review = require("../models/Review");
const Recipe = require("../models/Recipe");

// Create a new review
exports.createReview = async (req, res) => {
    const { comment, rating } = req.body; // Extract comment and rating from the request body
    const { recipeId } = req.params; // Extract recipeId from the request parameters
    try {
        // Find the recipe by its ID
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            // If the recipe is not found, send a 404 status code with an error message
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Create a new review with the provided details, user ID, and recipe ID
        const review = await Review.create({ comment, rating, user: req.user._id, recipe: recipeId });
        // Send the created review as a response with a 201 status code
        res.status(201).json(review);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews for a recipe
exports.getReviewsByRecipeId = async (req, res) => {
    try {
        // Find all reviews for a specific recipe and populate the user field with the user's name
        const reviews = await Review.find({ recipe: req.params.recipeId }).populate('user', 'name');
        // Send the list of reviews as a response
        res.json(reviews);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { comment, rating } = req.body; // Extract comment and rating from the request body
    try {
        // Find the review by its ID
        const review = await Review.findById(req.params.id);
        if (!review) {
            // If the review is not found, send a 404 status code with an error message
            return res.status(404).json({ error: 'Review not found' });
        }
        // Check if the user is authorized to update the review
        if (review.user.toString() !== req.user._id.toString()) {
            // If the user is not authorized, send a 401 status code with an error message
            return res.status(401).json({ error: 'User not authorized' });
        }
        // Update the review fields with the new values or keep the existing ones
        review.comment = comment || review.comment;
        review.rating = rating || review.rating;
        // Save the updated review
        await review.save();
        // Send the updated review as a response
        res.json(review);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        // Find the review by its ID
        const review = await Review.findById(req.params.id);
        if (!review) {
            // If the review is not found, send a 404 status code with an error message
            return res.status(404).json({ error: 'Review not found' });
        }
        // Check if the user is authorized to delete the review
        if (review.user.toString() !== req.user._id.toString()) {
            // If the user is not authorized, send a 401 status code with an error message
            return res.status(401).json({ error: 'User not authorized' });
        }
        // Remove the review from the database
        await review.remove();
        // Send a success message as a response
        res.json({ message: 'Review removed' });
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};
