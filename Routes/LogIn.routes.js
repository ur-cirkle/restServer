const jwt = require("jsonwebtoken");
const { uid } = require("uid");
const Login = async (req, res, db) => {
  // * Getting contextType(email/username) , contextValue and password from req.body
  const { contextType, contextValue, password, timezone, device } = req.body;
  try {
    //* Checking If user exists in db with context(email/username) = contextValue and password
    const [user] = await db.query(
      `SELECT username,userid FROM all_users WHERE 
                ${contextType}='${contextValue}' AND password='${password}'
        `
    );
    const deviceid = uid(13);
    //* Adding New Device to  user Devices
    await db.query(`INSERT INTO user_devices (deviceid, userid, device, location, logged_on) VALUES('${deviceid}', '${user[0].userid}', '${device}', '${timezone}', CURRENT_TIMESTAMP);
`);
    //* If exists then giving user obj in resp
    if (user.length === 0) {
      return res.json({ err: "Invalid Email/password" }).status(404);
    }

    const token = jwt.sign(
      { user: { ...user[0], deviceid } },
      process.env.JWT_SECRET
    );
    return res.json({ user: user[0], token });
    //* else giving Invalid credentials as resp
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
module.exports = Login;
