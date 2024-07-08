const express = require('express');
const connectDB = require('./utils/db');
const dotenv = require('dotenv');

// Routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());   // Middleware to parse JSON bodies of incoming requests
app.use(express.urlencoded({ extended: true }));    // Middleware to parse URL-encoded bodies of incoming requests

//Routes
app.use('/api/users', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('recipe-sharing API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});


module.exports = app;
