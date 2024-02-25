import conn from "../utils/db.js"

const getUser=(req,res)=>{
    const id=req.params.id;
    // console.log("userId",id);
    const qu="SELECT * FROM customers where UserId=?";
    conn.query(qu,[id],(err,result)=>{
        // console.log(result);
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result});
    })

}
const myappointment=(req,res)=>{
    const id=req.params.id;
    const qu="select app.ID as AppointmentID, br.Name as BranchName,brAdd.City as BranchAddress,app.Date as BookingDate,app.SlotTime as SlotTime, group_concat(s.Name) as ServiceName,app.Status as BookingStatus,p.Amount as TotalPrice from appointments as app join payments p on app.ID=p.AppointmentID join appointmentservices appSer on app.ID=appSer.appointmentID join services s on appSer.ServiceID=s.sId join branches br on app.BranchID=br.bId join branch_address brAdd on br.AddressId=brAdd.AddressId where app.CustomerID=? group by app.ID, br.Name,brAdd.City,app.Date ,app.SlotTime,app.Status ,p.Amount;"
    conn.query(qu,[id],(err,rows,fields)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:rows});
    })
}
const appointmentcancel=(req,res)=>{
    const id=req.params.id;
    console.log("Apointment to cancell",id);
    conn.query(`Update appointments Set Status="Cancelled" where ID=?`,[id],(err,rows,fields)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:rows});
    })
}
export {getUser,myappointment,appointmentcancel};