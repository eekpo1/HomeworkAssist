const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// const Post = require('./models/post');
const app = express();
// JSON PARSER - Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We should put the mongoose connection here
let db = mongoose.connection;
mongoose.connect(
  "mongodb+srv://edwin:three2one@homeworkassist-1kviu.mongodb.net/HomeworkAssist",
  { useNewUrlParser: true }
);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("database connection successful");
});

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: {
    admin: { type: Boolean, default: false },
    moderator: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
  },
  dateJoined: { type: Date, default: Date.now },
});

let User = mongoose.model("User", userSchema);
//  User.create({
//    username: 'edwah',
//    email: 'edwin321@ymail.com',
//    password: 'temp'
//  }, (err, user) => { if(err) throw err})

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

app.post("/api/register", (req, res) => {
  console.log(req.body);

  User.find({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user.length > 0) res.send("Username already exists");
    else {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) throw err;
        User.create(
          {
            username: req.body.username,
            email: req.body.email,
            password: hash,
          },
          (err) => {
            if (err) throw err;
            else {
              res.status(201).json({
                message: 'Successful',
              });
            }
          }
        );
      });
    }
  });
});

app.get("/api/login", (req, res) => {
  console.log(req.body)
  User.find({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user.hash, (err, result) => {
        if (err) throw err;

        // if (result) res.status(201).json({
        //   message: 'Successful'
        // });
        if(result) res.send('KEK');
      });
    }
  });
});

module.exports = app;
