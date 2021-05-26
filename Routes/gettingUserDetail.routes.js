const gettingUserDetail = async (req, res, db) => {
  const { userid } = req.user;

  const { receiverid } = req.query;

  let sql;

  sql = `select acc_type,username from user_details JOIN all_users ON all_users.userid = user_details.userid  where all_users.userid = '${receiverid}' ;`;
  const [row4, column4] = await db.query(sql);
  const findingCommunityOrpersonal = row4[0].acc_type;
  let peopleConnectedWithUser = 0,
    communityConnectedWithUser = 0;
  if (findingCommunityOrpersonal == "personal") {
    sql = `select count(*) as c1 from all_connections where connectorid ='${receiverid}' and connecteeid ='${receiverid}' and status = 'success';`;
    const [row1, column1] = await db.query(sql);
    peopleConnectedWithUser = row1[0].c1;

    sql = `select count(*) as c1 from all_connections where connectorid='${receiverid}' and status = 'community joined' ;`;

    const [row2, column2] = await db.query(sql);

    communityConnectedWithUser = row2[0].c1;
  } else {
    peopleConnectedWithUser = 0;

    sql = `select count(*) as c1 from all_connections where connecteeid='${receiverid}' and status = 'community joined' ;`;

    const [row2, column2] = await db.query(sql);

    communityConnectedWithUser = row2[0].c1;
  }

  sql = `call ur_cirkle.findingFriendAndThenGivingData('${userid}','${receiverid}') ;`;

  const [row3, column3] = await db.query(sql);

  const blogpost = row3[0];
  console.log(peopleConnectedWithUser);

  sql = `select status  from all_connections where (connectorid ='${userid}' and connecteeid ='${receiverid}') or (connectorid ='${receiverid}' and connecteeid ='${userid}'); `;
  const [row5, column5] = await db.query(sql);

  console.log(row5, userid, receiverid);
  const ckeckingUserIsalreadyJoinedOrNot = row5.length === 0 ? false : true;

  const data = {
    username: row4[0].username,
    connections: peopleConnectedWithUser,
    subscriptions: communityConnectedWithUser,
    ...blogpost[0],
    blogpost: blogpost.filter((v, i) => i !== 0),
    connectionStatus: ckeckingUserIsalreadyJoinedOrNot,
  };

  res.json(data).status(200);
};

module.exports = gettingUserDetail;
