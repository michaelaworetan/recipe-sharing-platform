const express = require('express');
const router = express.Router();

// Import controller functions for handling recipe-related operations
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, addReview, searchRecipes } = require('../controllers/recipeController');

const { protect } = require('../middleware/authMiddleware');    // Import the authentication middleware to protect routes
const multer = require('multer');   // Import multer for handling file uploads
const path = require('path');   // Import path module to handle file paths

// Set up multer storage configuration for image uploads
const storage = multer.diskStorage({
    // Define the destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the 'uploads/' directory
    },
    // Define the filename for uploaded files
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp and original file extension
    }
});

// Create an upload instance with the defined storage configuration
const upload = multer({ storage: storage });

// Route to create a recipe
router.post('/', protect, upload.single('image'), createRecipe); // Protected route, handles single image upload, calls createRecipe controller

// Route to search recipes
router.get('/search', searchRecipes); // Calls searchRecipes controller

// Route to get all recipes
router.get('/', getAllRecipes); // Calls getAllRecipes controller

// Route to get a single recipe by ID
router.get('/:id', getRecipeById); // Calls getRecipeById controller with recipe ID as a parameter

// Route to update a recipe
router.put('/:id', protect, upload.single('image'), updateRecipe); // Protected route, handles single image upload, calls updateRecipe controller with recipe ID as a parameter

// Route to delete a recipe
router.delete('/:id', protect, deleteRecipe); // Protected route, calls deleteRecipe controller with recipe ID as a parameter

// Route to add a review to a recipe
router.post('/:id/reviews', protect, addReview); // Protected route, calls addReview controller with recipe ID as a parameter

// Export the router to be used in other parts of the application
module.exports = router;
