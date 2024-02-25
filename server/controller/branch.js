import conn from "../utils/db.js"


const getAllBranches=(req,res)=>{
    conn.query("select * from branches br inner join branch_address brAd on br.AddressId=brAd.AddressId",(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const getBranch=(req,res)=>{
    const City=req.params.city;
    conn.query(`select * from branches br inner join branch_address brAd on br.AddressId=brAd.AddressId where brAd.City=?`,[City],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
export {getAllBranches,getBranch};