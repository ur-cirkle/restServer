const faker = require("faker");
const { uid } = require("uid");
const insertDummyData = async (db) => {
  const all_users = [];
  //console.log();
  const user_details = [];
  const randomGender = () => {
    const genders = ["M", "F", "O"];
    return genders[Math.floor(Math.random() * 3)];
  };
  const randomAccType = () => {
    const accTypes = ["P", "C"];
    return accTypes[Math.floor(Math.random() * 2)];
  };
  const randomDOB = () => {
    return `${Math.floor(Math.random() * 53 + 1950)}-${Math.floor(
      Math.random() * 12 + 1
    )}-${Math.floor(Math.random() * 28 + 1)}`;
  };
  const randomLocationSetting = () => {
    const availableLocSetting = ["N", "E", "C"];
    //* N = No One
    //* E = EveryBody
    //* C = Connections
    return availableLocSetting[
      Math.floor(Math.random() * availableLocSetting.length)
    ];
  };
  const randomAccVisibility = () => {
    const accVisibility = [true, false];
    return Number(
      accVisibility[Math.floor(Math.random() * accVisibility.length)]
    );
  };
  //* All users
  //** userid uid()
  //** username: faker.internet.userName()
  //** password: faker.internet.password()
  //** email   : faker.internet.email()

  //* User details
  //** userid       : uid()(same as userid in all_users)
  //** image        : faker.image.avatar()
  //** bio          : faker.lorem.sentence()
  //** connections  : Math.floor(Math.random() * 5000)
  //** communities  : Math.floor(Math.random() *500)
  //** dob          : faker.date.past()
  //** Account Type : randomAccType()
  //** timezone     : faker.address.timeZone()
  //** latitude     : faker.address.latitude()
  //** longitude    : faker.address.longitude()
  //** gender       : randomGender()

  // app.get("/check/username", (req, res) => checkUsername(req, res, db));
  for (let i = 0; i < 49; i++) {
    const userid = uid(11);
    all_users.push(
      `'${[
        userid,
        faker.internet.userName(),
        faker.internet.password(),
        faker.internet.email(),
      ].join("','")}'`
    );
    user_details.push(
      `'${[
        userid, //* UserID
        faker.image.avatar(), //* User Image
        faker.lorem.sentence(), //* Bia
        Math.floor(Math.random() * 5000), //* connections
        Math.floor(Math.random() * 500), //* communities
        randomDOB(), //* DOB
        randomAccType(), //* Account Type
        faker.address.timeZone(), //* Time Zone
        faker.address.latitude(), //* Latitude
        faker.address.longitude(), //* Longitude
        randomLocationSetting(), //* Location Setting
        randomGender(), //* Gender
        randomAccVisibility(), //*Acc Visibitiy Public/Private
      ].join("','")}'`
    );
  }
  await db.query(
    `INSERT INTO all_users (userid,username,password,email) VALUES (${all_users.join(
      "),("
    )})`
  );
  await db.query(
    `INSERT INTO user_details (userid,image,bio,connections,communities,DOB,acc_type,timezone,latitude,longitude,location_visiblity,gender,public) VALUES (${user_details.join(
      "),("
    )})`
  );
};
module.exports = insertDummyData;
