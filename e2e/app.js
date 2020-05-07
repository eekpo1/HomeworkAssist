require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  'mongodb+srv://edwin:three2one@homeworkassist-1kviu.mongodb.net/HomeworkAssist',
  { useNewUrlParser: true }
);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('database connection successful');
});

const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  refreshToken: { type: String, default: null },
  roles: {
    admin: { type: Boolean, default: false },
    moderator: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
  },
  dateJoined: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const postSchema =  mongoose.Schema({
  pinned: { type: Boolean, default: false },
  title: String,
  author: String,
  contents: String,
  replies: [{
    username: String,
    reply: String,
  }]
});

// postSchema.add({ replies: { type: [postSchema] } });

let postGroup = [
  'Introductions',
  'Off Topic',
  'Projects',
  'Suggestions',
  'CMPS 2010',
  'CMPS 2020',
  'CMPS 3500',
  'CMPS 3990',
  'CMPS 3233',
  'CMPS 3233',
  'CMPS 3233',
  'CMPS 4500',
  'CMPS 4540',
];

let posts = [];

for (let i = 0; i < postGroup.length; i++) {
  posts.push(mongoose.model(postGroup[i], postSchema));
}

console.log(posts)

// These headers help us make requests from Node to angular through CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

app.post('/api/posts/:id', (req, res, next) => {
  const i = +req.params.id;
  const subforum = posts[i];
  console.log(req.body.replies)
  const post = new subforum({
    pinned: req.body.pinned,
    title: req.body.title,
    contents: req.body.contents,
    author: req.body.author,
  });

  // post.replies.push({ username: req.body.username, reply: req.body.reply})
  // console.log(post)

  post.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Post added succesfully',
      id: result._id,
    });
  })
});

app.get('/api/posts/:id', (req, res) => {
  const i = +req.params.id;
  posts[i].find().then((documents) => {
    console.log(documents)
    res.status(200).json({
      message: 'posts fetched',
      posts: documents,
    })
  });
});

app.delete('/api/posts/:postid/:id', (req, res) => {
  console.log(req.params)
  const id = +req.params.postid;
  posts[id].deleteOne({ _id: req.params.id}).then((result) => {
    console.log(result.deletedCount)
    res.status(200).json({ message: 'post deleted'});
  }, error => {
    console.log(error)
  })
});

// app.update('/api/posts/:postid/:id', (req, res) => {
//   const postID = +req.params.postid;
//   const id = +req.params.id;

//   posts[postID].findOneAndUpdate({ _id: id, })

// })


app.post('/api/register', (req, res) => {
  User.find({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user.length > 0) res.status(409).json({ message: 'Username taken' });
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

app.post('/api/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    // console.log(user);
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, correct) => {
        if (err) throw err;
        // if (correct) res.status(201).json({
        //   message: 'Successful'
        // });
        if (correct) {
          const accessToken = generateAccessToken(user.toJSON());
          const refreshToken = jwt.sign(
            user.toJSON(),
            process.env.REFRESH_TOKEN_SECRET
          );
          User.updateOne(
            { username: user.username },
            { refreshToken: refreshToken },
            (err, res) => {
              if (err) throw err;
            }
          );
          res.json({ accessToken: accessToken, refreshToken: refreshToken });
        }
      });
    }
  });
});

app.post('/api/token', (req, res) => {
  const refreshToken = req.body.token;
  console.log(req.body);
  //store in db
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function generateAccessToken(user) {
  console.log(user);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}
module.exports = app;
