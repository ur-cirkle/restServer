const faker = require("faker");
const { uid } = require("uid");
const all_interests = require("./interests");
const insertDummyData = async (db) => {
  const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  // Inserting Predefined Interest;

  const interests = all_interests.map((interest) => `'${interest}'`);
  // await db.query(
  //   `INSERT INTO predefined_interests (interest) VALUES (${interests.join(
  //     "),("
  //   )})`
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

  const [allInterests] = await db.query(
    `SELECT interest FROM predefined_interests;`
  );

  const randomDOB = () => {
    return `${Math.floor(Math.random() * 53 + 1950)}-${Math.floor(
      Math.random() * 12 + 1
    )}-${Math.floor(Math.random() * 28 + 1)}`;
  };
  const geoJson = [];
  const personal = [];
  const community = [];
  const coordinates = [[[]]];

  let count = 0;
  console.log("kjsljlfdasj");
  for (let i = 0; i < 500; i++) {
    const userid = uid(11);

    for (let i = 0; i < 5; i++) {
      let interest = random(allInterests).interest;
      while (user_interests.indexOf(`'${userid}','${interest}'`) !== -1) {
        interest = random(allInterests).interest;
        break;
      }
      user_interests.push(`'${userid}','${interest}'`);
    }
    all_users.push(
      `'${userid}','${faker.internet.userName()}','${faker.internet.password()}','${faker.internet.email()}'`
    );
    user_details.push(`
      '${userid}','${faker.image.avatar()}','${faker.lorem.sentence()}','${randomDOB()}','${random(
      ["personal", "community"]
    )}','${random(["male", "female", "other", "not decided"])}','${random([
      0, 1,
    ])}'
    `);
    users_location.push(
      `'${userid}','${faker.address.timeZone()}','${faker.address.latitude()}','${faker.address.longitude()}'`
    );
    user_socketid.push(`'${userid}','${uid(15)}'`);
    personal.push({
      type: "Feature",
      properties: {
        description: faker.lorem.paragraph(),
        icon: random(["theatre-15", "bar-15", "theatre-15"]),
      },
      geometry: {
        type: "Point",
        coordinates: [
          Number(faker.address.longitude()),
          Number(faker.address.latitude()),
        ],
      },
    });
    community.push({
      type: "Feature",
      properties: {
        description: faker.lorem.paragraph(),
        icon: random(["theatre-15", "bar-15", "theatre-15"]),
      },
      geometry: {
        type: "Point",
        coordinates: [
          Number(faker.address.longitude()),
          Number(faker.address.latitude()),
        ],
      },
    });

    coordinates.push([]);
    for (let j = 0; j < 10; j++) {
      coordinates[count].push(
        community[community.length - 1].geometry.coordinates
      );
      coordinates[count].push([
        Number(faker.address.longitude()),
        Number(faker.address.latitude()),
      ]);
    }
    count++;
  }
  fs.writeFile(
    "./jeoDat.json",
    `{
    "bar-15":${JSON.stringify(community)}
    "theatre-15":${JSON.stringify(personal)}
  }`,
    (err) => {
      if (err) return console.log(err);
    }
  );

  // // console.log(user_interests);
  // await db.query(`INSERT INTO all_users (userid,username,password,email)
  //                                       VALUES(${all_users.join("),(")});
  //                       `);
  // await db.query(`INSERT INTO ur_cirkle.user_details
  //           (userid, image, bio, DOB, acc_type, gender, public)
  //           VALUES(${user_details.join("),(")});
  //           `);
  // await db.query(`INSERT INTO ur_cirkle.users_location
  //         (userid, timezone, latitude, longitude)
  //         VALUES(${users_location.join("),(")});`);
  // await db.query(`INSERT INTO ur_cirkle.users_socketid
  //       (userid, socketid)
  //       VALUES(${user_socketid.join("),(")});
  //       `);
  // await db.query(`INSERT INTO ur_cirkle.all_interests
  //     (userid, interests)
  //     VALUES(${user_interests.join("),(")});
  //     `);
  const user = {
    type: random(["community", "personal"]),
    username: faker.internet.userName(),
    userid: uid(),
  };
};
module.exports = insertDummyData;
