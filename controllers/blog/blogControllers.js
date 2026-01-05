const cloudinary = require("cloudinary").v2;
const Blog = require("../../models/blog.js");
const fs = require("fs");
//test
exports.test = (req, res) => {
  res.send("blogging API working...");
};

//create a blog
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, excerpt, tags, coverImage } = req.body;

//     if (!title) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     const blog = await Blog.create({
//       title,
//       excerpt,
//       tags,
//       coverImage,
//       author: req.user._id, //  LINK TO USER
//     });

//     res.status(201).json({
//       success: true,
//       message: "Blog created successfully",
//       blog,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Error creating blog",
//     });
//   }
// };

//confidential controller;
exports.getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    // Validate ID format (optional, but good)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    // Find the blog and ensure it belongs to the logged-in user
    const blog = await Blog.findOne({ _id: id, author: req.user._id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or you do not have permission to view it",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching the blog: " + err.message,
    });
  }
};
//create blog ai code

exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    let coverImageUrl = "";

    // If a file was uploaded
    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_covers", // optional folder
        use_filename: true,
        unique_filename: false,
      });

      coverImageUrl = result.secure_url;

      // Delete temp file
      fs.unlinkSync(req.file.path);
    }

    const blog = await Blog.create({
      title,
      excerpt,
      tags,
      coverImage: coverImageUrl, // Cloudinary URL
      author: req.user._id, // link to the user
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating blog: " + err.message,
    });
  }
};
