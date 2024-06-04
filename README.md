# Recipe-Sharing Platform Backend
## Project Description
The Recipe-Sharing Platform is a comprehensive backend service designed to enable users to share, discover, and review recipes. Built with Node.js, Express.js, and MongoDB, this platform supports full CRUD operations for recipes, user authentication, and review management. The backend also features robust validation, error handling, and a suite of tests using Jest to ensure reliable functionality.
## Features
- User Authentication: Secure registration and login functionality.
- Recipe Management: Create, read, update, and delete recipes.
- Review Management: Users can leave ratings and comments on recipes.
- Recipe Search and Filtering: Discover recipes by category, cuisine, ingredients, etc.
- Validation and Error Handling: Comprehensive checks for all API requests.
- RESTful APIs: Structured and standardized API endpoints.
- Testing: Thorough testing using Jest to validate backend functionality.
## Prerequisites
- Node.js
- MongoDB
## Installation
1. Clone the repository:
    git clone (https://github.com/michaelaworetan/recipe-sharing-platform.git)  
    cd recipe-sharing-platform
    
2. Install dependencies:
    
        
3. Create a `.env` file in the root directory and add the following:
    MONGO_URI=mongodb://localhost:27017/recipe-sharing-platform
    JWT_SECRET=your_jwt_secret
    
4. Start the server:
        
## Running Tests
To run tests using Jest, use the following command:
    ```bashnpm test