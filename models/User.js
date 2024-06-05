// Creating user model
// Import necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema with name, email, and password fields
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name field is required
    },
    email: {
        type: String,
        required: true, // Email field is required
        unique: true, // Email must be unique
    },
    password: {
        type: String,
        required: true, // Password field is required
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Pre-save hook to hash the password before saving the user model
userSchema.pre('save', async function (next) {
    // If the password field is not modified, proceed to the next middleware
    if (!this.isModified('password')) {
        next();
    }
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
