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
  for (let i = 0; i < 500; i++) {
    const userid = uid(11);
    all_users.push(
      `'${[
        userid,
        faker.internet.userName(),
        faker.internet.password(),
        faker.internet.email(),
      ].join("','")}'`
    );
    const accType = randomAccType();
    user_details.push(
      `'${[
        userid, //* UserID
        faker.image.avatar(), //* User Image
        faker.lorem.sentence(), //* Bia
        accType === "P" ? Math.floor(Math.random() * 500) : 0, //* connections
        accType === "P" ? Math.floor(Math.random() * 500) : 0, //* communities
        randomDOB(), //* DOB
        accType, //* Account Type
        faker.address.timeZone(), //* Time Zone
        faker.address.latitude(), //* Latitude
        faker.address.longitude(), //* Longitude
        randomLocationSetting(), //* Location Setting
        randomGender(), //* Gender
        randomAccVisibility(), //*Acc Visibitiy Public/Private
      ].join("','")}'`
    );
  }
  // await db.query(
  //   `INSERT INTO all_users (userid,username,password,email) VALUES (${all_users.join(
  //     "),("
  //   )})`
  // );
  // await db.query(
  //   `INSERT INTO user_details (userid,image,bio,connections,communities,DOB,acc_type,timezone,latitude,longitude,location_visiblity,gender,public) VALUES (${user_details.join(
  //     "),("
  //   )})`
  // );
  const interests = [
    "3D printing",
    "Amateur radio",
    "Scrapbook",
    "Amateur radio",
    "Acting",
    "Baton twirling",
    "Board games",
    "Book restoration",
    "Cabaret",
    "Calligraphy",
    "Candle making",
    "Computer programming",
    "Coffee roasting",
    "Cooking",
    "Colouring",
    "Cosplaying",
    "Couponing",
    "Creative writing",
    "Crocheting",
    "Cryptography",
    "Dance",
    "Digital arts",
    "Drama",
    "Drawing",
    "Do it yourself",
    "Electronics",
    "Embroidery",
    "Fashion",
    "Flower arranging",
    "Foreign language learning",
    "Gaming",
    "Tabletop games",
    "Role-playing games",
    "Gambling",
    "Genealogy",
    "Glassblowing",
    "Gunsmithing",
    "Homebrewing",
    "Ice skating",
    "Jewelry making",
    "Jigsaw puzzles",
    "Juggling",
    "Knapping",
    "Knitting",
    "Kabaddi",
    "Knife making",
    "Lacemaking",
    "Lapidary",
    "Leather crafting",
    "Lego building",
    "Lockpicking",
    "Machining",
    "Macrame",
    "Metalworking",
    "Magic",
    "Model building",
    "Listening to music",
    "Origami",
    "Painting",
    "Playing musical instruments",
    "Pet",
    "Poi",
    "Pottery",
    "Puzzles",
    "Quilting",
    "Reading",
    "Scrapbooking",
    "Sculpting",
    "Sewing",
    "Singing",
    "Sketching",
    "Soapmaking",
    "Sports",
    "Stand-up comedy",
    "Sudoku",
    "Table tennis",
    "Taxidermy",
    "Video gaming",
    "Watching movies",
    "Web surfing",
    "Whittling",
    "Wood carving",
    "Woodworking",
    "World Building",
    "Writing",
    "Yoga",
    "Yo-yoing",
    "Air sports",
    "Archery",
    "Astronomy",
    "Backpacking",
    "Base jumping",
    "Baseball",
    "Basketball",
    "Beekeeping",
    "Bird watching",
    "Blacksmithing",
    "Board sports",
    "Bodybuilding",
    "Brazilian jiu-jitsu",
    "Community",
    "Cycling",
    "Dowsing",
    "Driving",
    "Fishing",
    "Flag football",
    "Flying",
    "Flying disc",
    "Foraging",
    "Gardening",
    "Geocaching",
    "Ghost hunting",
    "Graffiti",
    "Handball",
    "Hiking",
    "Hooping",
    "Horseback riding",
    "Hunting",
    "Inline skating",
    "Jogging",
    "Kayaking",
    "Kite flying",
    "Kitesurfing",
    "Larping",
    "Letterboxing",
    "Metal detecting",
    "Motor sports",
    "Mountain biking",
    "Mountaineering",
    "Mushroom hunting",
    "Mycology",
    "Netball",
    "Nordic skating",
    "Orienteering",
    "Paintball",
    "Parkour",
    "Photography",
    "Polo",
    "Rafting",
    "Rappelling",
    "Rock climbing",
    "Roller skating",
    "Rugby",
    "Running",
    "Sailing",
    "Sand art",
    "Scouting",
    "Scuba diving",
    "Sculling",
    "Rowing",
    "Shooting",
    "Shopping",
    "Skateboarding",
    "Skiing",
    "Skim Boarding",
    "Skydiving",
    "Slacklining",
    "Snowboarding",
    "Stone skipping",
    "Surfing",
    "Swimming",
    "Taekwondo",
    "Tai chi",
    "Urban exploration",
    "Vacation",
    "Vehicle restoration",
    "Water sports",
  ].map((interest) => `'${uid(12)}', '${interest}'`);
  // db.query(
  //   `INSERT INTO all_interests(id, interest) VALUES (${interests.join("),(")})`
  // );
  // console.log(interests[0]);
};
module.exports = insertDummyData;
