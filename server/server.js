import express  from "express";
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import branchRoutes from './routes/branch.js'
import serviceRoutes from './routes/services.js'
import bookingRoutes from './routes/booking.js'
import adminRoutes from './routes/admin.js'
import bodyParser  from "body-parser";
import Razorpay from 'razorpay'
import paymentRoute from './routes/payment.js'
import cors from 'cors';
import fs from 'fs'
import cookieParser from "cookie-parser";
// import multer from "multer";
import path from 'path'
const app=express();
// app.use(cors({
//     origin: "http://localhost:3000", // Replace with the actual origin of your React app
//     credentials: true,
// }))


app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

export const instance =new Razorpay({
    key_id:process.env.key_id,
    // key_id:'rzp_test_q4hhrH5FZ0PawV',
    key_secret:'3e5bbtJ0DxUCXTYBUb535PpF',
})
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// headers: {
//     'Content-Type': 'application/json'
// }
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/user',userRoutes);
app.use('/api/branch',branchRoutes);
app.use('/api/service',serviceRoutes);
app.use('/api/booking',bookingRoutes);
app.use('/api/payment',paymentRoute);
// app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/uploads', express.static('uploads'));
app.listen(7000,()=>{
    console.log("Server listening at port 7000")
})