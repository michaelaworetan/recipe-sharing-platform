// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware
const bodyParser = require('body-parser'); // Body parsing middleware
const connectDB = require('./config/db'); // Database connection function

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Create an instance of Express
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(morgan('dev')); // Log HTTP requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipes/:recipeId/reviews', reviewRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('Recipe-Sharing Platform API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Export the app module
module.exports = app;
