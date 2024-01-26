import express  from "express";
const app=express();

app.get('/',(req,res)=>{
    res.send("hello from the server")
})

app.listen(7000,()=>{
    console.log("Server listening at port 8000")
})