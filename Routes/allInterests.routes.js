const allInterests = async (req, res, db) => {
  const [interests] = await db.query(
    `SELECT * FROM all_interests WHERE interest_type = 'predefined'`
  );
  res.json(interests);
};
module.exports = allInterests;
