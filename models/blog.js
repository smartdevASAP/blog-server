const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
    minLenght: 1,
  },
  excerpt: {
    type: String,
  },
  tags: {
    type: String,
  },
  coverImage: {
    type: string,
  },
});

const Blog = new mongoose.model("Blog", blogSchema);
module.exports = Blog;
