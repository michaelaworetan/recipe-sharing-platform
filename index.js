//Express App Setup
const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(express.json());  //Parse JSON bodies
app.use(cors());    //Enable Cross-Origin Resource Sharing

//Import routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { error } = require('console');

//use routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('api/recipes/:recipeId/reviews', reviewRoutes)

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;