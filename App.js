const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const Router = require("./routes/routes.js");
const BlogRoutes = require("./routes/blogRoutes.js");

app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true, // cookies
  })
);

app.use(cookieParser());
app.use(express.json());
//entry point for all apis
app.use("/api/v1", Router);
app.use("/api/v1/blog", BlogRoutes); //first suspect for an error

module.exports = app;
