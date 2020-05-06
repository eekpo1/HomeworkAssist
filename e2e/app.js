require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
  firstname: String,
  lastname: String,
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
  User.find({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user.length > 0) res.status(409).json({ message: 'Username taken'});
    else {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) throw err;
        User.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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

app.post("/api/login", (req, res) => {
  User.find({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password, (err, correct) => {
        if (err) throw err;
        // if (correct) res.status(201).json({
        //   message: 'Successful'
        // });
        if(correct) {
          const accessToken = generateAccessToken(user[0].toJSON());
          const refreshToken = jwt.sign(user[0].toJSON(), process.env.REFRESH_TOKEN_SECRET);
          res.json({accessToken: accessToken, refreshToken: refreshToken });
        }
      });
    }
  });
});

app.post('/api/token', (req, res) => {
  const refreshToken = req.body.token
  //store in db
  
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}
function generateAccessToken(user) {
  console.log(user)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}
module.exports = app