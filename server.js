// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const app = express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };
//get request
  app.get('/home',(req,res)=>{
    res.send(projectData);
    projectData=[];
  });
//post request
  app.post('/add',(req,res)=>{
    newObj={
      temp : req.body.temp,
      name : req.body.cityName,
      date : req.body.date,
      feeling : req.body.feeling
    }
    projectData.push(newObj);
  })