import conn from "../utils/db.js"

const bookAppointment=async(req,res)=>{
    // console.log("Hello",req.body)

    conn.query("SELECT ID FROM Customers WHERE UserID=?",[req.body.userId], (err, rows, fields) => {
        const CustomerID = rows[0].ID;
            conn.query("INSERT INTO `saloon`.`appointments` (`CustomerID`,`BranchID`,`Date`,`Status`,`SlotTime`)VALUES(?,?,?,'Booked',?)",[CustomerID,req.body.branchId,req.body.date,req.body.slot],(err,rows,fields)=>{
                if(!err){
                    // console.log("Rows",rows)..

                    if(Array.isArray(req.body.services)){
                        req.body.services.forEach(element => {
                            console.log("Services into database ",element)
                            conn.query("INSERT INTO AppointmentServices(AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, element], (err,rows, fields)=>{
                                if(err){
                                    console.log(err);
                                }
                            })
                            
                        });
                    }
                    else {
                        conn.query("INSERT INTO AppointmentServices (AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, req.body.services], (err,rows, fields)=>{})
                    }
                    conn.query("select sum(ser.Price) as TotalPrice from appointmentservices as apSer join services as ser on apSer.ServiceID=ser.sId where AppointmentID=?",[rows.insertId],(err,serAmount,fields)=>{
                        conn.query("INSERT INTO payments(AppointmentID,Amount)values(?,?)",[rows.insertId,serAmount[0].TotalPrice],(err,ser,fields)=>{
                            if(err){
                                console.log(err);
                            }   
                        })
                    })




                }
                else{
                    console.log(err);
                }                
            })

        }
    )}
// )}
export default bookAppointment;