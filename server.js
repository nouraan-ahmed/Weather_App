// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//import helmet
const helmet = require('helmet');
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet({

    contentSecurityPolicy: false,
  
  }));
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3000;
app.listen(port, (req, res)=> console.log(`running on port ${port}`));

function getdata(req, res) {
    res.send(projectData);
}

function postdata(req, res){
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
}

app.get('/all',getdata);
app.post('/add',postdata);