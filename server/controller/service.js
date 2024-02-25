import conn from "../utils/db.js"

const getAllServices=(req,res)=>{
    // console.log("userId",id);
    const id=req.params.id;
    const qu="SELECT * FROM services s left JOIN branch_service bs ON s.sId = bs.sId WHERE bs.bId=?";
    conn.query(qu,[id],(err,result)=>{
        // console.log(result);
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })

}


export default getAllServices;