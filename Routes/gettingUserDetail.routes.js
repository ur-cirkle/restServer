const gettingUserDetail = async(req, res, db)=>{
     const {userid} = req.user;

     let sql;

     sql =`select count(*) as c1 from all_connections where connectorid ='${userid}' and connecteeid ='${userid}' and status = 'success';`

    const [row1,column1] = await db.query(sql);

    const peopleConnectedWithUser = row1[0].c1; 

     sql = `select count(*) as c1 from all_connections where connectorid ='${userid}' and connecteeid ='${userid}' and status = 'success';`
     

    const [row2,column2] = await db.query(sql);

    const userConnectedWithPeople = row2[0].c1;

    sql = `select * from user_details inner join all_connections on all_connections.userid = user_details.userid where all_connections.userid = '${userid}' ;`

    const [row3,column3] = await db.query(sql);

    const blogpost = row3[0];


    const data  = {'userConnectedWithPeople':userConnectedWithPeople ,'peopleConnectedWithUser':peopleConnectedWithUser,'blogpost':blogpost}

    
    res.json(data).status(200);

}

module.exports = gettingUserDetail;