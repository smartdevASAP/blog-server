const Blog = require("../../models/blog.js");
//test
exports.test = (req, res) => {
  res.send("blogging API working...");
};

// CREATE BLOG
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, excerpt, tags, coverImage } = req.body;

//     // 1️⃣ Ensure user is authenticated
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     // 2️⃣ Validate required fields
//     if (!title) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     // 3️⃣ Create blog with author reference
//     const newBlog = await Blog.create({
//       title,
//       excerpt,
//       tags,
//       coverImage,
//       author: req.user._id, // 🔥 KEY PART
//     });

//     return res.status(201).json({
//       success: true,
//       message: "New blog created successfully",
//       blog: newBlog,
//     });
//   } catch (err) {
//     console.error("Create blog error:", err);

//     return res.status(500).json({
//       success: false,
//       message: "Error occurred while creating blog",
//     });
//   }
// };

//ai-2
exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, tags, coverImage } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      tags,
      coverImage,
      author: req.user._id, // 🔗 LINK TO USER
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
      message: "Error creating blog",
    });
  }
};
//get a blog bt id
// exports.getBlogById = async (req, res) => {
//   try {
//     //get the id using re.params
//     const id = req.params.id;
//     console.log(id);
//     //check whether the blog exists in the DB
//     const querriedBlog = await Blog.findById(id);
//     if (!querriedBlog) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "blog with id " + id + " doesnt exist. Could be deleted by the owner",
//       });
//     }
//     //send the request back to the user
//     res.status(200).json({
//       success: true,
//       blog: querriedBlog,
//     });
//   } catch (err) {
//     console.log(err.message);
//     return re.status(500).json({
//       success: false,
//       message: "error occured in get the blog " + err.message,
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
