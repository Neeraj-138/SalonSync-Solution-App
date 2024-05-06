import { instance } from "../server.js";
import crypto from "crypto";
import conn from "../utils/db.js";
var bookingDatas={}
const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.bookingData.totalAmount* 100), // amount in paise
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    bookingDatas=req.body.bookingData
    console.log("CheckoutApi",bookingDatas)
    // if(err) return res.json({Status:false,Error:"Query Error"})
    return res.json({
      Status: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};
const paymentVerification = (req, res) => {
  try {
    console.log("header",req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature}=req.body;
    console.log(razorpay_order_id, razorpay_payment_id,"booking data:",bookingDatas);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "3e5bbtJ0DxUCXTYBUb535PpF")
      .update(body.toString())
      .digest("hex");
    // console.log("sign recieved", razorpay_signature);
    // console.log("sign generated", expectedSignature);
    const isAuthentic = razorpay_signature === expectedSignature;
    // console.log("isAuthentic",isAuthentic);
    if (isAuthentic) {
      //database comes here
        conn.query("SELECT ID FROM Customers WHERE UserID=?",[bookingDatas.userId], (err, rows, fields) => {
          const CustomerID = rows[0].ID;
          console.log("CustomerId",CustomerID)
              conn.query("INSERT INTO `saloon`.`appointments`(`CustomerID`,`BranchID`,`Date`,`Status`,`SlotTime`)VALUES(?,?,?,'Booked',?)",[CustomerID,bookingDatas.branchId,bookingDatas.date,bookingDatas.slot],(err,rows,fields)=>{
                  if(!err)
                  {
                      console.log("Rows",rows)
                      if(Array.isArray(bookingDatas.services)){
                          bookingDatas.services.forEach(element => {
                              console.log("Services into database ",element)
                              conn.query("INSERT INTO AppointmentServices(AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, element.sId], (err,rows, fields)=>{
                                  if(err){
                                      console.log(err);
                                  }
                              })
                              
                          });
                      }
                      else {
                          conn.query("INSERT INTO AppointmentServices (AppointmentID, ServiceID) VALUES(?,?)", [rows.insertId, bookingDatas.services.sId], (err,rows, fields)=>{})
                      }
                      // conn.query("select sum(ser.Price) as TotalPrice from appointmentservices as apSer join services as ser on apSer.ServiceID=ser.sId where AppointmentID=?",[rows.insertId],(err,serAmount,fields)=>{
                          conn.query("INSERT INTO payments(AppointmentID,Amount,PaymentMode)values(?,?,?)",[rows.insertId,bookingDatas.totalAmount,bookingDatas.paymentMode],(err,ser,fields)=>{
                              if(err){
                                  console.log(err);
                              }
                              else{
                                res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
                              }   
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
    else {
      // console.log("verification",req.body)
      return res.json({ Status: false });
    }
  } catch (error) {
    console.log(error);
  }
};
export { checkout, paymentVerification };
