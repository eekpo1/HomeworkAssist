const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  a: {type: String, default: "", required: true},
});
