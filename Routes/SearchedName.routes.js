const imageDataUri = require("image-data-uri");
const SearchedName = async (req, res, db) => {
  const { userid } = req.user;
  const { search } = req.query;
  // userid = data.userid; userid of the person that has searched the name
  // serach =  data.search; searched name of the person

  const searchNameLength = search.length;
  // length of the data
  let [row1] = await db.query(
    `select count(interests) as firstOneCounting FROM all_interests  where userid = '${userid}';`
  );

  const countingTotalNumberOFInterestOfTheUser = row1[0].firstOneCounting;

  let sql = `SELECT all_users.userid,username,image FROM all_users JOIN user_details ON all_users.userid = user_details.userid WHERE all_users.username LIKE '${search}%'`;
  const [rawData] = await db.query(sql);

  var loop;
  const ranking = { 5: [], 4: [], 3: [], 2: [], 1: [], 0: [] };
  for (loop in rawData) {
    console.log(rawData);
    sql = `select ur_cirkle.matchingSearchbar(${countingTotalNumberOFInterestOfTheUser},'${userid}','${rawData[loop].userid}') as totalMatching; `;
    const [row1, column1] = await db.query(sql);

    const { username, userid: friendid, image } = rawData[loop];

    const datauri = !image.includes("https://")
      ? await imageDataUri.encodeFromFile(image)
      : image;

    ranking[row1[0].totalMatching].push({
      username,
      userid: friendid,
      image_url: datauri,
    });
  }
  var mainArray = [];
  for (loop in ranking) {
    mainArray.push(...ranking[loop]);
  }

  res.json(mainArray).status(200);
};

module.exports = SearchedName;
