const express = require("express");
const Router = express.Router();
const blogControllers = require("../controllers/blog/blogControllers");
const protect = require("../middlewares/protect.js");

//blogging endpoints
Router.get("/test", blogControllers.test);
Router.post("/write", protect.protect, blogControllers.createBlog);
Router.get("/:id", protect.protect, blogControllers.getBlogById);

module.exports = Router;
