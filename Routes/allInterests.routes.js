const allInterests = async (req, res, db) => {
  const [interests] = await db.query(`SELECT * FROM predefined_interests`);
  res.json(interests.map(({ interest }) => interest));
};
module.exports = allInterests;
