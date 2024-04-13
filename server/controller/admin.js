import conn from "../utils/db.js"

const AllBookedAppointment=(req,res)=>{
    conn.query(`SELECT A.ID AS AppointmentID, 
    C.FirstName AS FirstName,C.LastName AS LastName,
     B.Name AS Branch_Name,
     B.City, 
     A.Date, A.slotTime,    A.Status,    GROUP_CONCAT(DISTINCT S.Name ORDER BY S.sId ASC) AS ServiceNames,
     Pa.Amount AS Amount FROM Appointments AS A JOIN Customers AS C ON A.CustomerID = C.ID
 JOIN
     Branches AS B ON A.BranchID = B.bId
 JOIN
     Payments AS Pa ON Pa.AppointmentID = A.ID
 LEFT JOIN
     Appointmentservices AS ASV ON A.ID = ASV.AppointmentID
 LEFT JOIN
     Services AS S ON ASV.ServiceID = S.sId
 
 GROUP BY
     A.ID, A.CustomerID, A.BranchID, A.Date, A.Status, A.slotTime
 ORDER BY
     A.ID DESC`,(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"})
        return res.json({Status:true ,result:result})
    })}

    const allemployee=(req,res)=>{
        conn.query("Select * from employees where verified=1",(err,result)=>{
            if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true ,result:result})
        })
    }
    const requrestemployee=(req,res)=>{
        conn.query("Select * from employees where verified=0",(err,result)=>{
            if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true ,result:result})
        })
    }
    const request=async(req,res)=>{
        console.log(req.body)
        const fileName = req.file.filename;
        const { branchId, CustomerId }=req.body;
        console.log('BranchId:', branchId);
        console.log('Customer ID:', CustomerId);
        console.log('File:', fileName);
        if((branchId===undefined)||(CustomerId===undefined)||(fileName===null)){
            return res.json({
                Request:false,
                Message:"Please fill all fields"
            })
        }else{
            // return res.json({Status:true })
            conn.query("SELECT * FROM Customers WHERE UserID=?", [CustomerId], (err, rows, fields) => {
                // console.log(rows[0]);
                conn.query(
                    "INSERT INTO Employees(UserID, FirstName, LastName, Email, Phone, BranchID, Verified,resume) VALUES(?,?,?,?,?,?,?,?)",
                    [CustomerId, rows[0].FirstName, rows[0].LastName, rows[0].Email, rows[0].Phone, branchId, false,fileName], (err, rows, fields) => {
                        if (!err) {
                            // conn.query("DELETE FROM Customers WHERE UserID=?", [CustomerId], (err, rows, field) => {
                                // if (!err) {
                                    // conn.query("UPDATE Users SET type='Employee' WHERE UserID=?", [CustomerId], (err, rows, field) => {
                                    
                                    // if(err) return res.json({Status:false,Error:"Query Error"})
                                    
                                    return res.json({Status:true,Result:"Request Submitted"})

                                    }else {
                                        return res.json({Status:false,Result:"Request already sent!!"})
                                        }
                                })
                                // } else {
                                //     console.log(err)
                                // }
                            // });
                        // } else {
                            // console.log(err);
                        // }
                    }
                )

        }
        
       

       
    }

    const acceptrequest=(req,res)=>{
        // const id=req.params.ID;
        const id=req.params.id;
        conn.query("UPDATE Employees SET Verified=1 WHERE ID=?",[id],(err,rows)=>{
            if(!err)
            {
                conn.query("Select UserID from Employees where ID=?",[id],(err,rows)=>{
                    if(!err){
                        const CustomerID=rows[0].UserID
                        conn.query("DELETE FROM Customers WHERE UserID=?", [CustomerID], (err, rows, field) => {
                            if (!err) {
                                conn.query("UPDATE Users SET type='Employee' WHERE UserID=?",[CustomerID], (err, rows, field) => {
                                    res.json({Status:true ,Message:'RequestAccepted'})                      
                                })
                            }
                        })

                    }
                })
            }}
        )}
    const rejectrequest=(req,res)=>{
        const id=req.params.id;
        conn.query("DELETE FROM Employees WHERE ID = ?",[id],(err,rows)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({Status:true,Message:"Reject Successfully"})
            }
        })
    }
    const getemployee=(req,res)=>{
        const id=req.params.id;
        conn.query("Select * from Employee where eId=?",[id],(err,rows)=>{
            if(err) return res.json({Status:false,Error:"Query Error"})
            return res.json({Status:true ,result:rows[0]})
        })
    }
    const updateEmployee=(req,res)=>{

    }


export { AllBookedAppointment,allemployee,requrestemployee,request,rejectrequest,acceptrequest,updateEmployee,getemployee}