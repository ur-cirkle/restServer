const  SearchedName = ({ data, db, io, socket })=>{
const [userid,search] =  data;
// userid = data.userid; userid of the person that has searched the name 
// serach =  data.search; searched name of the person


const searchNameLength = search.length;
// length of the data 


let [row1,column] = `select count(interests) as firstOneCounting  where userid = '${userid}';`

const countingTotalNumberOFInterestOfTheUser = row1.firstOneCounting;


let sql =`select all_users.userid,all_users.username from (select substring(username,1,'${searchNameLength}') as c1 ,userid from all_users) as c2 ,all_users where c2.c1='${search}'  and all_users.userid =c2.userid;`
const[rawData,column]= await db.query(sql);

var loop;
const ranking = {5:[],4:[],3:[],2:[],1:[],0:[]}
for(loop in rawData){
    sql = `call matchingSearchbar('${countingTotalNumberOFInterestOfTheUser}','${userid}','${search}');`
    const [row1,column1] = await db.query(sql);
    ranking[row1.totalMatching].push(rawData[loop].username);  
         
    

}
var mainArray =[]
for(loop in ranking){
mainArray.push(...ranking[loop])
}


}

module.exports = SearchedName;