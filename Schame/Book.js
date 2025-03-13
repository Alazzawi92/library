const mongoose = require("mongoose");
// schema
const BookSchema = new mongoose.Schema({
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  idUser: {
    type: String
  },
  cover: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  published: {
    type: Date,
  },
  genre: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  pages: {
    type: Number,
  },
  language: {
    type: String,
  },
  publisher: {
    type: String,
  },
  format: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  rating: {
    type: Number,
  },
});
const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
