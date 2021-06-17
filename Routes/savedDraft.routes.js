const savedDraft = async({req,res,db})=>{

    const { userid } = req.user;

    let sql ;

    sql = `select * from blogSaving where userid ='${userid}';`

    const [blogData,cloumn] =  await db.query(sql);


    res.status(200).json({blogdata});




}

module.exports = savedDraft;