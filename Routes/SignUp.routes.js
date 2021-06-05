const { uid } = require("uid/secure");
const imageDataUri = require("image-data-uri");
const jwt = require("jsonwebtoken");
const SignUp = async (req, res, db) => {
  //* Getting Credentials From req.body
  const {
    username,
    password,
    email,
    type,
    timezone,
    latitude,
    longitude,
    interests,
    device,
  } = req.body;
  console.log(req.body)
  const datauri = await imageDataUri.encodeFromFile("./media/demo.png");
  try {
    //* Creating User Image File in Media with name username/avatar.{imageExtension}
    const image = await imageDataUri.outputFile(
      datauri,
      `./media/${username}/avatar`
    );
    const initialData = {
      userid: uid(),
      image,
      timezone,
      latitude,
      longitude,
      public: 1,
    };
    //* Inserting all_users tables
    await db.query(
      `INSERT INTO all_users (userid,username,password,email) VALUES ('${initialData.userid}','${username}','${password}','${email}')`
    );
    console.log(`INSERT INTO user_details
                      (userid,image,acc_type,public)
                      VALUES
                      (
                          '${initialData.userid}','${initialData.image}','${type}','${initialData.public}'
                      )`);
    //* Inserting Into user_details table
    await db.query(
      `INSERT INTO user_details
                      (userid,image,acc_type,public)
                      VALUES
                      (
                          '${initialData.userid}','${initialData.image}','${type}','${initialData.public}'
                      )`
    );
    
    //* Inserting Into users_location
    if (!latitude && !longitude) {
      await db.query(
        `INSERT INTO users_location(userid,timezone,location_visiblity) VALUES('${initialData.userid}','${initialData.timezone}','noone')`
      );
    } else {
      await db.query(
        `INSERT INTO users_location(userid,timezone,latitude,longitude,location_visiblity)
        VALUES('${initialData.userid}','${initialData.timezone}','${latitude}','${longitude}','noone')`
      );
    }
    //* Inserting interests
    for (let interest of interests) {
      await db.query(
        `INSERT INTO all_interests values('${interest}','${initialData.userid}')`
      );
    }
    const deviceid = uid(13);
    //* Adding New Device to  user Devices
    await db.query(`INSERT INTO user_devices (deviceid, userid, device, location, logged_on) VALUES('${deviceid}', '${initialData.userid}', '${device}', '${timezone}', CURRENT_TIMESTAMP);
`);
    const token = jwt.sign(
      { user: { username, userid: initialData.userid, deviceid } },
      process.env.JWT_SECRET
    );
    return res.json({
      user: { username, userid: initialData.userid, email },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
module.exports = SignUp;
