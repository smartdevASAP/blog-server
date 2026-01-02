const express = require("express");
const app = express();
const Router = require("./routes/routes.js");
//more configurations for cookies
app.use(express.json());
//entry point for all apis
app.use("/api/v1", Router);

module.exports = app;
