const { uid } = require("uid");
const imageDataUri = require("image-data-uri");
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
  } = req.body;
  //- Generating Dummy Data
  //* Datauri
  const datauri = await imageDataUri.encodeFromURL(
    "https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png"
  );

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
  try {
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
    return res.json({ username, userid: initialData.userid });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
module.exports = SignUp;
