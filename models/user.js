// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       trim: true,
//       minlength: 3,
//       maxlength: 30,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);

// // module.exports = User;
// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       maxlength: 50,
//       minlength: 1,
//     },
//     excerpt: {
//       type: String,
//     },
//     tags: {
//       type: [String], // better than String
//     },
//     coverImage: {
//       type: String,
//     },

//     // 🔥 THIS IS THE REFERENCE
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,

    // OPTIONAL: keep track of blogs created by user
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
