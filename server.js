//* Pakage Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const insertDummy = require("./insertDummyData");
//* Routes
const checkUsername = require("./Routes/checkUsername.routes");
const SignUp = require("./Routes/SignUp.routes");
const Login = require("./Routes/Login.routes");
//* Connecting Database
const pool = mysql.createPool({
  host: "localhost",
  database: "ur_cirkle",
  user: "root",
  password: "1234567890",
  port: 3306,
});
const db = pool.promise();
app.get("/check/username", (req, res) => checkUsername(req, res, db));
app.post("/signup", (req, res) => SignUp(req, res, db));
app.post("/login", (req, res) => Login(req, res, db));
const port = 5000 || process.env.PORT;
// ** Uncomment This To Generate Dummy Data for all_users and user_details table
// insertDummy(db);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
