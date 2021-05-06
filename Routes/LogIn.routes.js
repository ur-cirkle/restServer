const jwt = require("jsonwebtoken");
const Login = async (req, res, db) => {
  // * Getting contextType(email/username) , contextValue and password from req.body
  const { contextType, contextValue, password } = req.body;
  try {
    //* Checking If user exists in db with context(email/username) = contextValue and password
    const [user] = await db.query(
      `SELECT username,userid,email FROM all_users WHERE 
                ${contextType}='${contextValue}' AND password='${password}'
        `
    );
    //* If exists then giving user obj in resp
    if (user.length === 0) {
      return res.json({ err: "Invalid Email/password" }).status(404);
    }

    const token = jwt.sign({ user: user[0] }, process.env.JWT_SECRET);
    return res.json({ user: user[0], token });
    //* else giving Invalid credentials as resp
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
module.exports = Login;
