const Login = async (req, res, db) => {
  // * Getting contextType(email/username) , contextValue and password from req.body
  const { contextType, contextValue, password } = req.body;
  try {
    //* Checking If user exists in db with context(email/username) = contextValue and password
    const [user] = await db.query(
      `SELECT username,userid FROM all_users WHERE 
                ${contextType}='${contextValue}' AND password='${password}'
        `
    );
    //* If exists then giving user obj in resp
    if (user.length > 0) {
      return res.json({ user: user[0] }).status(200);
    }
    //* else giving Invalid credentials as resp
    return res.json({ err: "Invalid Email/password" }).status(404);
  } catch (err) {
    console.log(err);
  }
};
module.exports = Login;
