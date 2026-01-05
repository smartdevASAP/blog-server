const user_controllers = require("../controllers/users/authentication.js");
const express = require("express");
const { protect } = require("../middlewares/protect.js");
// const app = require("../App.js");

const Router = express.Router();
//test
Router.get("/ping", user_controllers.ping);
//register
Router.post("/register", user_controllers.register);
//login
Router.post("/login", user_controllers.login);
//logout
Router.get("/logout", user_controllers.logout);

//cookie protected route
Router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

//get user by params
Router.get("/:_id", user_controllers.getUserById);
module.exports = Router;
