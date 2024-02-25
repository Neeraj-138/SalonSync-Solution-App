import mysql from 'mysql';
// import 'dotenv.config'
const conn= mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root123",
        database:"saloon",
    }
)
conn.connect((err)=>
{   if(err)
    {
        console.log(err)
    }
    else{
        console.log("Database  Connected successfully")
    }
})
export default conn;