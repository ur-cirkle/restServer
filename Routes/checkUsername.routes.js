const checkUsername = async (req, res, db) => {
  //* Getting username from user params
  const username = req.query.username;
  //* Checking If username exist in database
  const [usernamesInDB] = await db.query(
    `SELECT * FROM all_users WHERE username = '${username}'`
  );
  //* If exists then available false
  if (usernamesInDB.length > 0) {
    return res.status(200).json({ available: false });
  }
  //* Else available true
  return res.status(200).json({ available: true });
};
module.exports = checkUsername;
