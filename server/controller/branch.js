import conn from "../utils/db.js"


const getAllBranches=(req,res)=>{
    conn.query("select  bId,Name,City,District,State,PinCode,location from branches",(err,result)=>{
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
const addBranch=(req,res)=>{ 
    console.log("inserting",req.body);
    conn.query("INSERT INTO `saloon`.`branches` (`bId`,`Name`, `Street`, `City`, `District`, `State`, `PinCode`) VALUES (?,?,?,?,?,?,?)",
    [req.body.id,req.body.name,req.body.street,req.body.street,req.body.city,req.body.district,req.body.state,req.body.pincode],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const getBranchToUpdate=(req,res)=>{
    const id=req.params.id;
    // console.log("getting",id)
    
    conn.query("SELECT * FROM branches where bId=?",[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    }
    )

}
const branchUpdate=(req,res)=>{
    const id=req.params.id;
    console.log("hitiing",req.body)

    conn.query("UPDATE `saloon`.`branches` SET `Name`=?, `Street` = ?, `City` = ?, `District` = ?,`State`=?, `PinCode` = ? WHERE (`bId` = ?)",
    [req.body.name,req.body.street,req.body.city,req.body.district,req.body.state,req.body.pincode,id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});

    })

}

export {getAllBranches,addBranch,getBranch,getBranchToUpdate,branchUpdate};