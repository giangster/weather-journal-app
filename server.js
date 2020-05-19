// Setup empty JS object to act as endpoint for all routes
projectData = {};
console.log(projectData);

// Require Express to run server and routes
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`running on localhost:${port}`);
});

app.get("/weather", function (req, res) {
  res.send(projectData);
});

app.post("/add", function (req, res) {
  projectData.date = req.body.date;
  projectData.temperature = req.body.temperature;
  projectData.userResponse = req.body.userResponse;
});
