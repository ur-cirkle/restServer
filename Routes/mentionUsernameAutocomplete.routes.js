const mentionUsernameAutocomplete = async (req, res, db) => {
  const { query } = req.query;
  const [users] = db.query(
    `SELECT username,userid,acc_type FROM all_users WHERE username LIKE '${query}%' LIMIT 5`
  );
  res.json({ users: users }).status(200);
};
module.exports = mentionUsernameAutocomplete;
