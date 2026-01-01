const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
  }
};

module.exports = connectToDatabase;
