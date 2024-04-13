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
const addServices=(req,res)=>{
    const Name=req.body.service;
    const Description=req.body.desc;
    const Price=req.body.price;
    conn.query("INSERT INTO `services` (`Name`,`Description`,`Price`)VALUES(?,?,?)",[Name,Description,Price],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
    
    // console.log(service,desc,price);
}

const getServices=(req,res)=>{
    conn.query("Select * from services",(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}

const getService=(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    conn.query("select * from services where sId=?",[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}


const deleteService=(req,res)=>{
    const id=req.params.sId;
    // console.log("from server",id);
    conn.query(`DELETE FROM services WHERE sId=?`,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })
}


const updateService=(req,res)=>{
    const id=req.params;
    const Name=req.body.Name;

    const Description=req.body.Description;
    const Price =req.body.Price;
    console.log("to update", id.sId, Name,Description,Price);
    conn.query("UPDATE `services` SET `Name` = ?, `Description` = ?, `Price` =? WHERE `sId` = ?",[Name,Description,Price,id.sId],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    });
    
}

export {getAllServices,addServices,getService,getServices,deleteService,updateService};