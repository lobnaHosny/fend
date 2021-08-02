// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const bodyParser = require('bpdy-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors);

// Initialize the main project folder

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
  