//* Pakage Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const imageDataUri = require("image-data-uri");
const fs = require("fs");
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
//* Connecting Database
const pool = mysql.createPool({
  host: "localhost",
  database: "ur_cirkle",
  user: "root",
  password: "1234567890",
  port: 3306,
});
const db = pool.promise();
// fillUserTables(db);
// fillConnectionsTables(db);

// //* Middleware
// const verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers.authorization;
//   if (bearerHeader === undefined) return res.sendStatus(403);
//   const token = bearerHeader.split(" ")[1];
//   console.log(bearerHeader);
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     const { user } = decoded;
//     req.user = user;
//     next();
//   });
// };
// console.log(uid());
// app.get("/check/username", (req, res) => checkUsername(req, res, db));
// app.post("/signup", (req, res) => SignUp(req, res, db));
// app.post("/login", (req, res) => Login(req, res, db));
// app.get("/interests", (req, res) => allInterests(req, res, db));

// app.get("/search", verifyToken, (req, res) => serchedNames(req, res, db));
// app.get("/metion/username", verifyToken, (req, res) => mentionAutocomplete());
// app.get("/me", verifyToken, (req, res) => {
//   res.json({ user: req.user }).status(200);
// });

var c = "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"

function compress(base64, options) {
  return new Promise(function (resolve, reject) {
    var type = options.type,
        width = options.width,
        min = options.min,
        max = options.max;
    var img = new Image();
    var quality = 0.6;
    img.src = base64;
    img.setAttribute('crossOrigin', 'Anonymous');
    var imgWidth, imgHeight;

    img.onload = function () {
      imgWidth = img.width;
      imgHeight = img.height;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      if (Math.max(imgWidth, imgHeight) > width) {
        if (imgWidth > imgHeight) {
          canvas.width = width;
          canvas.height = width * imgHeight / imgWidth;
        } else {
          canvas.height = width;
          canvas.width = width * imgWidth / imgHeight;
        }
      } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        quality = 0.6;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var base64 = canvas.toDataURL(type, quality);

      while (base64.length / 1024 > max) {
        quality -= 0.01;
        base64 = canvas.toDataURL(type, quality);
      }

      while (base64.length / 1024 < min) {
        quality += 0.001;
        base64 = canvas.toDataURL(type, quality);
      }

      resolve(base64);
    };

    img.onerror = function () {
      reject();
    };
  });
}

var p = compress(c,{width: 400,
  type: 'image/png', // default
  max: 200, // max size
  min: 20, // min size
  quality: 0.8});


console.log(p);

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
