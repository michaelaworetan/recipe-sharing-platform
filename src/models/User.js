const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcryptjs for hashing passwords

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

// Middleware to hash the password before saving the user
UserSchema.pre('save', async function(next) {
    // If the password field is not modified, move to the next middleware
    if (!this.isModified('password')) {
        return next();
    }
    // Generates a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hashes the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    // Call the next middleware
    next();
});

// Method to compare the provided password with the hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    // Compare the entered password with the hashed password
    return await bcrypt.compare(enteredPassword, this.password);
};

// Creates a User model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
