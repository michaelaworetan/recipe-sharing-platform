const express = require('express'); // Import the express library
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController'); // Import recipe controller functions
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware for route protection

const router = express.Router(); // Create a new router object

// Define routes for recipes

// Route to handle getting all recipes and creating a new recipe
router.route('/')
    .get(getAllRecipes) // GET request to '/' calls the getAllRecipes function to retrieve all recipes
    .post(protect, createRecipe); // POST request to '/' calls the createRecipe function to create a new recipe, protected by the protect middleware

// Route to handle getting, updating, and deleting a recipe by ID
router.route('/:id')
    .get(getRecipeById) // GET request to '/:id' calls the getRecipeById function to retrieve a recipe by its ID
    .put(protect, updateRecipe) // PUT request to '/:id' calls the updateRecipe function to update a recipe by its ID, protected by the protect middleware
    .delete(protect, deleteRecipe); // DELETE request to '/:id' calls the deleteRecipe function to delete a recipe by its ID, protected by the protect middleware

module.exports = router; // Export the router object to be used in other parts of the application
