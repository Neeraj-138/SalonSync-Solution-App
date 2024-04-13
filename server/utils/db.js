import mysql from 'mysql';
import {config } from "dotenv";
config();
const conn= mysql.createConnection(
    {
        host:process.env.Host,
        user:process.env.User,
        password:process.env.Password,
        database:process.env.Database,
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