// module.exports = Router;

//ai refactored
const express = require("express");
const Router = express.Router();
const blogControllers = require("../controllers/blog/blogControllers");
const { protect } = require("../middlewares/protect.js");
//const upload = require("../middlewares/multer"); // import multer config
const upload = require("../configs/multer.js");

//blogging endpoints
Router.get("/test", blogControllers.test);
Router.post(
  "/write",
  protect,
  upload.single("coverImage"), //  Multer
  blogControllers.createBlog
);
Router.get("/all", protect, blogControllers.getAllBlogs);
//for a logged in user
Router.get("/logged/:id", protect, blogControllers.getBlogByIdLogged);
//public route
Router.get("/:id", blogControllers.getBlogById);

module.exports = Router;
