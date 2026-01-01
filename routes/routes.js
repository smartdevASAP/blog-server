const user_controllers = require("../controllers/users/authentication.js");
const express = require("express");
// const app = require("../App.js");

const Router = express.Router();

Router.get("/ping", user_controllers.ping);

module.exports = Router;
