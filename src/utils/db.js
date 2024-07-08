const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Log a success message if the connection is established
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log an error message if the connection fails and exit the process
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Export the connectDB function for use in other files
module.exports = connectDB;
