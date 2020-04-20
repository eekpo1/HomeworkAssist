const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const Post = require('./models/post');
const app = express();

let db = mongoose.connection
mongoose.connect('mongodb+srv://edwin:three2one@homeworkassist-1kviu.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    // we're connected!
    console.log('hi')
  })



// We should put the mongoose connection here

// JSON PARSER - Body Parser
app.use(bodyParser.json());


// These headers help us make requests from Node to angular through CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

module.exports = app;
