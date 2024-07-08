const app = require('./app');
//Get the port from the environment variables or default to 5000
const PORT = process.env.PORT || 5000;

//start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});