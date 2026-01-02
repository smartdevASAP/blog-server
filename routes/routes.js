const user_controllers = require("../controllers/users/authentication.js");
const express = require("express");
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

module.exports = Router;
