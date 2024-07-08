const express = require('express');
const connectDB = require('./utils/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

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
