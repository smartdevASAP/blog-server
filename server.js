const app = require("./App.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectToDatabase = require("./configs/mongoDB.js");
const cloudinary = require("./configs/cloudinary.js");

const port = process.env.PORT || 3000;

cloudinary.api
  .ping()
  .then(() => console.log("Cloudinary connected "))
  .catch((err) => console.error("Cloudinary error ", err));
connectToDatabase();
app.listen(port, () => {
  console.log(`server launched in port http://localhost:${port}`);
});
// http://localhost:5000
