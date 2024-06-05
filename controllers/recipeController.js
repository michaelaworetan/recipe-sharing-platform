//creating recipeController
// Import the Recipe model
const Recipe = require("../models/Recipe");

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, image } = req.body; // Extract title, ingredients, instructions, and image from the request body
    try {
        // Create a new recipe with the provided details and the user ID from the request
        const recipe = await Recipe.create({ title, ingredients, instructions, image, user: req.user._id });
        // Send the created recipe as a response with a 201 status code
        res.status(201).json(recipe);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        // Find all recipes
        const recipes = await Recipe.find();
        // Send the list of recipes as a response
        res.json(recipes);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        // Find a recipe by its ID
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            // If the recipe is not found, send a 404 status code with an error message
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Send the recipe as a response
        res.json(recipe);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
    const { title, ingredients, instructions, image } = req.body; // Extract title, ingredients, instructions, and image from the request body
    try {
        // Find the recipe by its ID
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            // If the recipe is not found, send a 404 status code with an error message
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Check if the user is authorized to update the recipe
        if (recipe.user.toString() !== req.user._id.toString()) {
            // If the user is not authorized, send a 401 status code with an error message
            return res.status(401).json({ error: 'User not authorized' });
        }
        // Update the recipe fields with the new values or keep the existing ones
        recipe.title = title || recipe.title;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.image = image || recipe.image;
        // Save the updated recipe
        await recipe.save();
        // Send the updated recipe as a response
        res.json(recipe);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        // Find the recipe by its ID
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            // If the recipe is not found, send a 404 status code with an error message
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Check if the user is authorized to delete the recipe
        if (recipe.user.toString() !== req.user._id.toString()) {
            // If the user is not authorized, send a 401 status code with an error message
            return res.status(401).json({ error: 'User not authorized' });
        }
        // Remove the recipe from the database
        await recipe.remove();
        // Send a success message as a response
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};

// Search and filter recipes
exports.searchRecipes = async (req, res) => {
    const { category, cuisine, ingredients } = req.query; // Extract search filters from the query parameters
    let filter = {}; // Initialize an empty filter object
    if (category) filter.category = category; // Add category to the filter if provided
    if (cuisine) filter.cuisine = cuisine; // Add cuisine to the filter if provided
    if (ingredients) filter.ingredients = { $in: ingredients.split(',') }; // Add ingredients to the filter if provided
    try {
        // Find recipes that match the filter criteria
        const recipes = await Recipe.find(filter);
        // Send the list of filtered recipes as a response
        res.json(recipes);
    } catch (error) {
        // Handle errors and send a 400 status code with the error message
        res.status(400).json({ error: error.message });
    }
};
