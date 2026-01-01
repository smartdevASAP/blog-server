const app = require("./App.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server launched in port https://localhost:${port}`);
});
