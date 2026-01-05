// const express = require("express");
// const Router = express.Router();
// const blogControllers = require("../controllers/blog/blogControllers");
// const protect = require("../middlewares/protect.js");

// //blogging endpoints
// Router.get("/test", blogControllers.test);
// Router.post("/write", protect.protect, blogControllers.createBlog);
// Router.get("/:id", protect.protect, blogControllers.getBlogById);

// module.exports = Router;

// const express = require("express");
// const Router = express.Router();
// const blogControllers = require("../controllers/blog/blogControllers");
// const { protect } = require("../middlewares/protect.js");
// const multer = require("multer");

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // temporary folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // unique filename
//   },
// });
// const upload = multer({ storage });

// // Blogging endpoints
// Router.get("/test", blogControllers.test);

// // Add 'upload.single("coverImage")' to handle file upload
// Router.post(
//   "/write",
//   protect,
//   upload.single("coverImage"),
//   blogControllers.createBlog
// );

// Router.get("/:id", protect, blogControllers.getBlogById);

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
  upload.single("coverImage"), // <-- Multer middleware
  blogControllers.createBlog
);
Router.get("/:id", protect, blogControllers.getBlogById);

module.exports = Router;
