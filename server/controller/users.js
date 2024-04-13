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
    // console.log("myappointmentID",id)
    if(id==="undefined"){
        return res.json({Status:false,Error:"Please Login"})
    }else{
        conn.query(`select ID from customers where UserID=?`,[id],(err,rows)=>{
            const qu=`select app.ID as AppointmentID,br.Name as BranchName,	br.City as BranchAddress, app.Date as BookingDate,	app.SlotTime as SlotTime,	group_concat(s.Name) as ServiceName,	app.Status as BookingStatus,    p.Amount as TotalPrice     from appointments as app		 join payments p on app.ID=p.AppointmentID		 join appointmentservices appSer on app.ID=appSer.appointmentID  join services s on appSer.ServiceID=s.sId	 join branches br on app.BranchID=br.bId where app.CustomerID=?	and Status="Booked"	 group by app.ID, br.Name,br.City,app.Date ,app.SlotTime ,p.Amount`
            conn.query(qu,[rows[0].ID],(err,rows,fields)=>{
                // console.log("result",rows)
                if(err) return res.json({Status:false,Error:"Query Error"})
    
                return res.json({Status:true ,result:rows});
            })
        })
    }
    
    
}
const myCancelledAppointment=(req,res)=>{
    const id=req.params.id;
    console.log(" Cancelled",id);
    
    conn.query(`select ID from customers where UserID=?`,[id],(err,rows)=>{
        console.log("IDis",rows[0].ID)
        const qu=`select app.ID as AppointmentID,br.Name as BranchName,	br.City as BranchAddress,app.Date as BookingDate,app.SlotTime as SlotTime,	group_concat(s.Name) as ServiceName,	app.Status as BookingStatus,    p.Amount as TotalPrice  from appointments as app	join payments p on app.ID=p.AppointmentID join appointmentservices appSer on app.ID=appSer.appointmentID  join services s on appSer.ServiceID=s.sId	 join branches br on app.BranchID=br.bId where app.CustomerID=?	and Status="Cancelled" group by app.ID, br.Name,br.City,app.Date ,app.SlotTime ,p.Amount`
        conn.query(qu,[rows[0].ID],(err,rows,fields)=>{
            console.log("cancelledAppointmet", rows)
            if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true ,result:rows});
        })
    })
    
}
const appointmentcancel=(req,res)=>{
    const id=req.params.id;
    console.log("Apointment to cancell",id);
    conn.query(`Update appointments Set Status="Cancelled" where ID=?`,[id],(err,rows,fields)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true });
    })
}
export {getUser,myappointment,myCancelledAppointment,appointmentcancel};