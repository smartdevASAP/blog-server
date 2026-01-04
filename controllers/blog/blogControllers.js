const Blog = require("../../models/blog.js");
exports.createBlog = async (req, res) => {
  try {
    const { newBlog } = req.body;
    if (!newBlog) {
      return res.status(400).json({
        success: true,
        message: "No blog written...",
      });
    }
    const blogRequest = await Blog.create(newBlog);
    res.status(201).json({
      success: true,
      blog: blogRequest,
    });
  } catch (err) {}
};
