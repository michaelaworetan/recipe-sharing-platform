// Load environment variables from .env file
require('dotenv').config();

// Importing neccessary modules
const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware
const bodyParser = require('body-parser'); // Body parsing middleware
const connectDB = require('./config/db'); // Database connection function

// Creating an instance of Express
const app = express();

// Connect to the database
connectDB();

// Exporting the app module
module.exports = app;