// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
let projectData = {};
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors);

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const port = 5500;
const server = app.listen(port, listening());

function listening() {
    console.log(`Server is running on port ${port}! Party Time!`);
};

// Initialize all route with a callback function
app.get('/all', function(req,res){
    res.send(projectData);
});

// Post Route
app.post('/all', function(req,res){
    projectData.temp = req.body.temp;
    //TODO
    projectData.date;
    projectData.userInput;
});