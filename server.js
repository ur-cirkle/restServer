//* Pakage Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { uid } = require("uid");
app.use(express.json());
app.use(cors());
const fillUserTables = require("./insertDummmy/users_tables");
const fillConnectionsTables = require("./insertDummmy/connection_tables");
//* Routes
const checkUsername = require("./Routes/checkUsername.routes");
const SignUp = require("./Routes/SignUp.routes");
const Login = require("./Routes/Login.routes");
const allInterests = require("./Routes/allInterests.routes");
const serchedNames = require("./Routes/SearchedName.routes");
const gettingUserDetail = require("./Routes/gettingUserDetail.routes");
//* Connecting Database
const pool = mysql.createPool({
  host: "localhost",
  database: "ur_cirkle",
  user: "root",
  password: "1234567890",
  port: 3306,
});
const db = pool.promise();
//fillUserTables(db);
//fillConnectionsTables(db);

//* Middleware
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) return res.sendStatus(403);
  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);
    const { user } = decoded;
    const [devices] = await db.query(
      `SELECT * FROM user_devices WHERE deviceid='${user.deviceid}'`
    );
    if (devices.length === 0)
      return res.status(403).json({ username: user.username });
    req.user = user;
    next();
  });
};

app.get("/check/username", (req, res) => checkUsername(req, res, db));
app.post("/signup", (req, res) => SignUp(req, res, db));
app.post("/login", (req, res) => Login(req, res, db));
app.get("/interests", (req, res) => allInterests(req, res, db));

app.get("/search", verifyToken, (req, res) => serchedNames(req, res, db));
app.get("/metion/username", verifyToken, (req, res) => mentionAutocomplete());
app.get("/me", verifyToken, (req, res) => {
  console.log("djssld");
  res.json({ user: req.user }).status(200);
});
app.get("/profile", verifyToken, (req, res) => gettingUserDetail(req, res, db));
const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
