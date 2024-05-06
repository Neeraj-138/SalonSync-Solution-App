import conn from "../utils/db.js"


const getAllBranches=(req,res)=>{
    conn.query("select  bId,Name,City,District,State,PinCode,location from branches",(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const deleteBranch=(req,res)=>{
    const id=req.params.bId;
    console.log("deleting",id);
    conn.query("Delete from saloon.branches where bId=?",[id],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true});
    })
}
const getBranch=(req,res)=>{
    const City=req.params.city;
    // console.log("City::",City)
    conn.query(`SELECT * FROM saloon.branches where City=?`,[City],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const addBranch=(req,res)=>{ 
    // console.log("inserting",req.body);
    conn.query("INSERT INTO `saloon`.`branches` (`bId`,`Name`, `Street`, `City`, `District`, `State`, `PinCode`,`location`) VALUES (?,?,?,?,?,?,?,?)",
    [req.body.id,req.body.name,req.body.street,req.body.street,req.body.city,req.body.district,req.body.state,req.body.pincode,req.body.location],(err,result)=>{
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
const getAllBookAppointment = (req,res) =>{
    console.log("getting Bookings");
    conn.query("SELECT count(*) as Bookings FROM saloon.appointments",(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}

const getAllBranchesTherapist = (req,res)=>{
    console.log("getting therapists");
    conn.query("select count(*) as Therapist FROM saloon.users where users.Type = 'Employee' or users.Type = 'Manager'",(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const gettotalClients=(req,res)=>{
    console.log("getting");
    conn.query("select count(*) as Clients FROM saloon.users where users.Type = 'Customer'",(err,result)=>{
        // return res.json({Status:true});
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
    
}
const   getTotalRevanue=(req,res)=>{
    
    conn.query("SELECT	sum(p.Amount) as TotalRevenue	FROM saloon.payments	p	inner	join appointments	ap on	p.AppointmentID=ap.ID	where ap.Status='Booked'",(err,result)=>{        
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const   getAllcancelledAppointment=(req,res)=>{
    console.log("getting")
    conn.query("SELECT count(*) as TotalCancelled FROM saloon.appointments where Status='Cancelled'",(err,result)=>{        
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const   getAllSkinBookedAppointment=(req,res)=>{
    console.log("getting")
    conn.query("select count(*) as SkinBooked from appointments app inner join appointmentservices apser on app.ID=apser.AppointmentID inner join services s on apser.ServiceID=s.sId inner join service_categories sc on s.cId=sc.cId where sc.CategoryName='Skin' and app.Status='Booked'",(err,result)=>{        
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const   getAllHairBookedAppointment=(req,res)=>{
    console.log("getting")
    conn.query("select count(*) as HairBooked  from appointments app inner join appointmentservices apser on app.ID=apser.AppointmentID inner join services s on apser.ServiceID=s.sId inner join service_categories sc on s.cId=sc.cId where sc.CategoryName='Hair' and app.Status='Booked'",(err,result)=>{        
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const   getAllMakeupBookedAppointment=(req,res)=>{
    console.log("getting")
    conn.query("select count(*) as MakeupBooked  from appointments app inner join appointmentservices apser on app.ID=apser.AppointmentID inner join services s on apser.ServiceID=s.sId inner join service_categories sc on s.cId=sc.cId where sc.CategoryName='Makeup' and app.Status='Booked'",(err,result)=>{        
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
const   getAllHandAndFeetBookedAppointment=(req,res)=>{
    console.log("getting")
    conn.query("select count(*) as HandAndFeet  from appointments app inner join appointmentservices apser on app.ID=apser.AppointmentID inner join services s on apser.ServiceID=s.sId inner join service_categories sc on s.cId=sc.cId where sc.CategoryName='Hand&Feet' and app.Status='Booked'",(err,result)=>{        
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true,result:result});
    })
}
export {deleteBranch,getAllHandAndFeetBookedAppointment,getAllMakeupBookedAppointment,getAllHairBookedAppointment,getAllSkinBookedAppointment,getAllcancelledAppointment,getTotalRevanue,getAllBookAppointment,getAllBranchesTherapist,gettotalClients,getAllBranches,addBranch,getBranch,getBranchToUpdate,branchUpdate};