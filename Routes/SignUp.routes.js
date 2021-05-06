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
    dob,
    latitude,
    longitude,
    interests,
  } = req.body;
  console.log(req.body);
  try {
    //- Generating Dummy Data
    //* Datauri
    const datauri = await imageDataUri.encodeFromURL(
      "https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png"
    );

    //* Creating User Image File in Media with name {username}.{imageExtensio}
    const image = await imageDataUri.outputFile(datauri, `./media/${username}`);
    const initialData = {
      userid: uid(),
      image,
      dob,
      timezone,
      latitude,
      longitude,
      public: 1,
    };
    //* Inserting all_users tables
    await db.query(
      `INSERT INTO all_users (userid,username,password,email) VALUES ('${initialData.userid}','${username}','${password}','${email}')`
    );
    //* Inserting Into user_details table
    await db.query(
      `INSERT INTO user_details
                      (userid,image,DOB,acc_type,timezone,${
                        latitude && longitude ? "latitude,longitude," : ""
                      }public)
                      VALUES
                      (
                          '${initialData.userid}','${initialData.image}','${
        initialData.dob
      }','${type}','${initialData.timezone}',${
        latitude && longitude
          ? `'${initialData.latitude}','${initialData.longitude}',`
          : ""
      }'${initialData.public}'
                      )`
    );
    //* Inserting interests
    const predefinedInterests = interests[0].map(
      (interest) => `'${initialData.userid}', '${interest}'`
    );
    const customInterest = [];
    const customInterestWithUserid = [];
    for (let interest of interests[1]) {
      const interestId = uid();
      customInterest.push(`'${interestId}', '${interest}','custom'`);
      customInterestWithUserid.push(`'${initialData.userid}', '${interestId}'`);
    }

    if (customInterest.length > 0) {
      await db.query(
        `INSERT INTO all_interests(id, interest,interest_type) VALUES(${customInterest.join(
          "),("
        )})`
      );
      await db.query(
        `INSERT INTO user_interests(userid, interest_id) VALUES(${customInterestWithUserid.join(
          "),("
        )})`
      );
    }

    if (predefinedInterests.length > 0) {
      await db.query(
        `INSERT INTO user_interests (userid, interest_id) VALUES(${predefinedInterests.join(
          "),("
        )})`
      );
    }

    const token = jwt.sign(
      { user: { username, userid: initialData.userid, email } },
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
