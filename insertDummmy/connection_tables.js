const { uid } = require("uid/secure");
const fillConnectionsTables = async (db) => {
  const random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  const [personalAcc] = await db.query(
    `SELECT userid,public FROM user_details WHERE acc_type='personal'`
  );
  const [communityAcc] = await db.query(
    `SELECT userid,public FROM user_details WHERE acc_type='community'`
  );

  const all_connections = [];
  const user_communities = [];
  for (let i = 0; i < 500; i++) {
    const connector = random(personalAcc);
    const connectee = random(personalAcc);
    const statusConectee = Boolean(connectee.public)
      ? "success"
      : random(["success", "pending"]);
    const community = random(communityAcc);
    const statusCommunity = Boolean(community.public)
      ? "success"
      : random(["success", "pending"]);
    if (connector === connectee) return;
    all_connections.push(
      `'${uid(16)}','${connector.userid}','${
        connectee.userid
      }','${statusConectee}'`
    );
    user_communities.push(
      `'${uid(17)}','${connector.userid}','${
        community.userid
      }','${statusCommunity}'`
    );
  }

  await db.query(`INSERT INTO ur_cirkle.all_connections
  (connectionid, connectorid, connecteeid, status)
  VALUES(${all_connections.join("),(")});`);

  await db.query(`INSERT INTO ur_cirkle.user_communities
  (connectionid, connectorid, comunityid, status)
  VALUES(${user_communities.join("),(")});
  `);
};
module.exports = fillConnectionsTables;
