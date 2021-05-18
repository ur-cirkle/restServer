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

  let sql = `select all_users.userid,all_users.username from (select substring(username,1,'${searchNameLength}') as c1 ,userid from all_users) as c2 ,all_users where c2.c1='${search}'  and all_users.userid = c2.userid;`;
  const [rawData] = await db.query(sql);

  var loop;
  const ranking = { 5: [], 4: [], 3: [], 2: [], 1: [], 0: [] };
  for (loop in rawData) {
    sql = `select ur_cirkle.matchingSearchbar(${countingTotalNumberOFInterestOfTheUser},'${userid}','${rawData[loop].userid}') as totalMatching; `;
    const [row1, column1] = await db.query(sql);

    const { username, userid: friendid } = rawData[loop];
    ranking[row1[0].totalMatching].push({ username, userid: friendid });
  }
  var mainArray = [];
  for (loop in ranking) {
    mainArray.push(...ranking[loop]);
  }
  console.log(mainArray);
  res.json(mainArray).status(200);
};

module.exports = SearchedName;
