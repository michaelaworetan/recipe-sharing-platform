const Recipe = require('../models/Recipe');
const multer = require('multer');   // Import multer for handling file uploads
const path = require('path');   // Import path for handling and transforming file paths

// Set up multer storage configuration for image uploads
const storage = multer.diskStorage({
    // Set the destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
    },
    // Set the filename for uploaded files
    filename: (req, file, cb) => {
        // Use the current timestamp as the filename and append the file extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create a multer upload instance with the defined storage configuration
const upload = multer({ storage: storage });

// Controller to create a new recipe
exports.createRecipe = async (req, res) => {
    try {
        // Extract title, ingredients, and instructions from the request body
        const { title, ingredients, instructions } = req.body;
        // Get the image file path if an image was uploaded
        const image = req.file ? req.file.path : null;

        // Create a new Recipe instance with the provided data
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            image,
            user: req.user.id // Link the recipe to the logged-in user
        });

        // Save the new recipe to the database
        const recipe = await newRecipe.save();
        // Respond with a 201 status and the created recipe
        res.status(201).json(recipe);
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        // Find all recipes in the database
        const recipes = await Recipe.find();
        // Respond with a 200 status and the list of recipes
        res.status(200).json(recipes);
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to get a single recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        // Find the recipe by ID
        const recipe = await Recipe.findById(req.params.id);

        // If the recipe is not found, respond with a 404 status and an error message
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Respond with a 200 status and the found recipe
        res.status(200).json(recipe);
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to update a recipe
exports.updateRecipe = async (req, res) => {
    try {
        // Extract title, ingredients, and instructions from the request body
        const { title, ingredients, instructions } = req.body;
        // Get the image file path if an image was uploaded
        const image = req.file ? req.file.path : null;

        // Create an object with the updated data
        const updatedData = {
            title,
            ingredients,
            instructions,
            ...(image && { image }) // Include the image field only if an image was uploaded
        };

        // Find the recipe by ID and update it with the new data
        const recipe = await Recipe.findByIdAndUpdate( req.params.id, { $set: updatedData }, { new: true } ); // Return the updated document

        // If the recipe is not found, respond with a 404 status and an error message
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Respond with a 200 status and the updated recipe
        res.status(200).json(recipe);
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        // Find the recipe by ID and delete it
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        // If the recipe is not found, respond with a 404 status and an error message
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Respond with a 200 status and a success message
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to add a review to a recipe
exports.addReview = async (req, res) => {
    try {
        // Extract rating and comment from the request body
        const { rating, comment } = req.body;

        // Find the recipe by ID
        const recipe = await Recipe.findById(req.params.id);

        // If the recipe is not found, respond with a 404 status and an error message
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Create a new review object
        const review = {
            user: req.user.id, // Link the review to the logged-in user
            rating,
            comment,
            date: Date.now() // Set the review date to the current date and time
        };

        // Add the review to the recipe's reviews array
        recipe.reviews.push(review);
        // Update the recipe's average rating
        recipe.rating =
            recipe.reviews.reduce((acc, item) => item.rating + acc, 0) /
            recipe.reviews.length;

        // Save the updated recipe
        await recipe.save();
        // Respond with a 201 status and the updated recipe
        res.status(201).json(recipe);
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Controller to search for recipes
exports.searchRecipes = async (req, res) => {
    try {
        // Extract query parameters for title, ingredients, category, and cuisine
        const { title, ingredients, category, cuisine } = req.query;
        let query = {};

        // Add a title search condition to the query if a title is provided
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex search
        }

        // Add an ingredients search condition to the query if ingredients are provided
        if (ingredients) {
            query.ingredients = { $regex: ingredients, $options: 'i' }; // Case-insensitive regex search
        }

        // Add a category search condition to the query if a category is provided
        if (category) {
            query.category = category;
        }

        // Add a cuisine search condition to the query if a cuisine is provided
        if (cuisine) {
            query.cuisine = cuisine;
        }

        // Find recipes that match the search conditions
        const recipes = await Recipe.find(query);
        // Respond with a 200 status and the list of matching recipes
        res.status(200).json(recipes);
    } catch (error) {
        // If there's an error, respond with a 500 status and the error message
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
