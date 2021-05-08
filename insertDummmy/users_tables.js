const faker = require("faker");
const { uid } = require("uid");
const all_interests = require("./interests");
const insertDummyData = async (db) => {
  const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  // Inserting Predefined Interest;

  const interests = all_interests.map(
    (interest) => `'${uid(12)}', '${interest}'`
  );
  // await db.query(
  //   `INSERT INTO all_interests(id, interest) VALUES (${interests.join("),(")})`
  // );
  //* All users
  //** userid   : uid(11)
  //** username : faker.internet.userName()
  //** password : faker.internet.password()
  //** email    : faker.internet.email()

  //* User details
  //** userid       : uid(11)(same as userid in all_users)
  //** image        : faker.image.avatar()
  //** bio          : faker.lorem.sentence()
  //** dob          : faker.date.past()
  //** Account Type : random(['personal','community'])
  //** gender       : random(['male','female','other','not decided'])
  //** public       : random([true,false])
  //* User location
  //** timezone     : faker.address.timeZone()
  //** latitude     : faker.address.latitude()
  //** longitude    : faker.address.longitude()
  //* All Interests
  //** id            : uid(12)
  //** interest      : interests
  //** interest_type : random(["predefined","custom"])
  //* User Interests
  //** userid     : uid(11) (same as userid in all_users)
  //** interestid : uid(12) (same as userid in all_interests)
  const all_users = [];
  const user_details = [];
  const user_interests = [];
  const users_location = [];
  const user_socketid = [];

  const [allInterests] = await db.query(`SELECT * FROM all_interests`);
  const randomDOB = () => {
    return `${Math.floor(Math.random() * 53 + 1950)}-${Math.floor(
      Math.random() * 12 + 1
    )}-${Math.floor(Math.random() * 28 + 1)}`;
  };
  for (let i = 0; i < 500; i++) {
    const userid = uid(11);

    for (let i = 0; i < 5; i++) {
      user_interests.push(`'${userid}','${random(allInterests).id}'`);
    }

    all_users.push(
      `'${userid}','${faker.internet.userName()}','${faker.internet.password()}','${faker.internet.email()}'`
    );
    user_details.push(`
      '${userid}','${faker.image.avatar()}','${faker.lorem.sentence()}','${randomDOB()}','${random(
      ["personal", "community"]
    )}','${random(["male", "female", "other", "not decided"])}','${random([
      0,
      1,
    ])}'
    `);
    users_location.push(
      `'${userid}','${faker.address.timeZone()}','${faker.address.latitude()}','${faker.address.longitude()}'`
    );
    user_socketid.push(`'${userid}','${uid(15)}'`);
  }

  await db.query(`INSERT INTO all_users (userid,username,password,email)
                                        VALUES(${all_users.join("),(")});
                        `);
  await db.query(`INSERT INTO ur_cirkle.user_details
            (userid, image, bio, DOB, acc_type, gender, public)
            VALUES(${user_details.join("),(")});
            `);
  await db.query(`INSERT INTO ur_cirkle.users_location
          (userid, timezone, latitude, longitude)
          VALUES(${users_location.join("),(")});`);
  await db.query(`INSERT INTO ur_cirkle.users_socketid
        (userid, socketid)
        VALUES(${user_socketid.join("),(")});
        `);
  await db.query(`INSERT INTO ur_cirkle.user_interests
      (userid, interest_id)
      VALUES(${user_interests.join("),(")});
      `);
};
module.exports = insertDummyData;
