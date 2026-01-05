// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     maxLength: 50,
//     minLenght: 1,
//   },
//   excerpt: {
//     type: String,
//   },
//   tags: {
//     type: String,
//   },
//   coverImage: {
//     type: String,
//   },
// });

// const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;

// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       maxLength: 50,
//       minLength: 1, // ❗ fixed typo
//     },

//     excerpt: {
//       type: String,
//     },

//     tags: {
//       type: [String], // ✅ better than String
//     },

//     coverImage: {
//       type: String,
//     },

//     // 🔗 USER REFERENCE (VERY IMPORTANT)
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // must match User model name
//       required: true,
//     },
//   },
//   { timestamps: true } // ✅ good practice
// );

// const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;

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
