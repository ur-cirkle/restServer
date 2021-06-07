const blogDraftSaving = ({req,res})=>{

    const { userid } = req.user;
    const { blog,heading } = req.query;

    let sql ;
    sql = `select ur_cirkle.new_function('${blog}', '${userid}','${heading}');`

    const[gettingresult]  =  await query(sql);

    const result = gettingresult.result;

    res.status(200).json({"message":result});
 
}

   
module.exports = blogDraftSaving;