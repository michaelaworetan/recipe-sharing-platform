# Recipe-Sharing Platform

## Overview

The Recipe-Sharing Platform is a web application that allows users to share and discover recipes. Users can register, log in, create, edit, delete recipes, rate recipes, and leave reviews. The application includes features such as user authentication, recipe search and filtering, and image uploads.

## Features

- User Authentication: Securely register and log in users.
- Recipe Management: Create, edit, and delete recipes, including titles, ingredients, instructions, and images.
- Reviews and Ratings: Users can rate recipes and leave comments.
- Recipe Search: Search and filter recipes by category, cuisine, or ingredients.
- Error Handling: Proper validation and error handling for user inputs and API requests.
- Testing: Comprehensive Jest tests for backend API functionality.

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for image uploads)
- Jest (for testing)

## Project Structure
recipe-sharing-platform/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── recipeController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── recipeRoutes.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── recipe.test.js
│   ├── utils/
│   │   └── db.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── jest.config.js
├── package.json
└── package-lock.json


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/michaelaworetan/recipe-sharing-platform.git
   cd recipe-sharing-platform
   npm install

## Configuration
1. Create a .env file in the root directory with the following content:
    MONGO_URI=mongodb://localhost:27017/recipe-sharing
    JWT_SECRET=your_jwt_secret
2. Ensure the uploads directory exists in the root of the project:
   ```bash
   mkdir -p uploads

## Running the Application
1. Start the development server:
   ```bash
   npm run dev
2. The server will be running at `http://localhost:5000`

##  API Endpoints
User Routes
`POST /api/users/register` - Register a new user
`POST /api/users/login` - Log in a user
`GET /api/users/profiles` - Get all user profiles
Recipe Routes
`POST /api/recipes` - Create a new recipe
`GET /api/recipes` - Get all recipes
`GET /api/recipes/search` - Search recipes
`GET /api/recipes/:id` - Get a recipe by ID
`PUT /api/recipes/:id` - Update a recipe by ID
`DELETE /api/recipes/:id` - Delete a recipe by ID
`POST /api/recipes/:id/reviews` - Add a review to a recipe

##  Testing
Run tests using Jest:
```bash `
``npm test `
## Usage
Creating a Recipe
To create a recipe, send a POST request to /api/recipes with the following form-data fields:

`title`: Title of the recipe
`ingredients`: Ingredients of the recipe
`instructions`: Instructions for the recipe
`category`: Category of the recipe
`cuisine`: Cuisine of the recipe
`image`: Image file of the recipe

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Thanks to the Node.js and Express.js communities for their excellent documentation and support.
Thanks to the MongoDB and Mongoose teams for their powerful database tools.
Thanks to the Jest team for their robust testing framework.

