const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 150,
      minlength: 1,
    },
    excerpt: String,
    tags: [String],

    coverImage: String,

    // 🔗 AUTHOR REFERENCE
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ PREVENT OVERWRITE ERROR
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;
