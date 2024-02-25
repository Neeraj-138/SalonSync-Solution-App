import express  from "express";
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import branchRoutes from './routes/branch.js'
import serviceRoutes from './routes/services.js'
import bookingRoutes from './routes/booking.js'
import cors from 'cors';
const app=express();


// app.use(function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods",['GET','POST','PUT','DELETE']);
//     res.header("Access-Control-Allow-Credentials", "true");
//   });
// app.use(cors())
app.use(cors({
    origin: "http://localhost:3000/*", // Replace with the actual origin of your React app
    credentials: true,
}))

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/branch',branchRoutes);
app.use('/api/service',serviceRoutes);
app.use('/api/booking',bookingRoutes);


app.listen(7000,()=>{
    console.log("Server listening at port 7000")
})