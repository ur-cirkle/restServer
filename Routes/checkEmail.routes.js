const checkEmail = async (req, res, db) => {
    const { email } = req.query;
    const [user] = await db.query(`SELECT * FROM all_users WHERE email='${email}';`);
    if (user.length > 0) {
        return res.status(200).json({ available: false });
    }
    return res.status(200).json({ available: true });
}
module.exports = checkEmail;