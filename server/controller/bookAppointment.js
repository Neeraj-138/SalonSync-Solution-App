import conn from "../utils/db.js"

const bookAppointment=async(req,res)=>{
    console.log("Hello",req.body)
    conn.query("SELECT ID FROM Customers WHERE UserID=?",[req.body.bookingData.userId], (err, rows, fields) => {
        const CustomerID = rows[0].ID;

            conn.query("INSERT INTO `saloon`.`appointments` (`CustomerID`,`BranchID`,`Date`,`Status`,`SlotTime`)VALUES(?,?,?,'Booked',?)",[CustomerID,req.body.bookingData.branchId,req.body.bookingData.date,req.body.bookingData.slot],(err,rows,fields)=>{
                if(!err){
                    console.log("Rows",rows.insertId)

                    if(Array.isArray(req.body.bookingData.services)){
                        req.body.bookingData.services.forEach(element => {
                            console.log("Services into database ",element)
                            conn.query("INSERT INTO AppointmentServices(AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, element.sId], (err,rows, fields)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("inserting",rows);
                                }
                            })
                            
                        });
                    }
                    else {
                        conn.query("INSERT INTO AppointmentServices (AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, req.body.bookingData.services], (err,rows, fields)=>{})
                    }
                    // conn.query("select sum(ser.Price) as TotalPrice from appointmentservices as apSer join services as ser on apSer.ServiceID=ser.sId where AppointmentID=?",[rows.insertId],(err,serAmount,fields)=>{
                        conn.query("INSERT INTO payments(AppointmentID,Amount,PaymentMode)values(?,?,?)",[rows.insertId,req.body.bookingData.totalAmount,req.body.bookingData.paymentMode],(err,ser,fields)=>{
                            if(err) return res.json({Status:false,Error:"Query Error"})
                            return res.json({Status:true ,result:ser});    
                        })
                    // })
                }
                else{
                    console.log(err);
                }                
            })

        }
    )
}

export default bookAppointment;