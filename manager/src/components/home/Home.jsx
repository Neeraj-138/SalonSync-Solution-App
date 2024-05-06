import  { useEffect, useState } from 'react'
import React, { PureComponent } from 'react';
import { BarChart,  PieChart, Pie,Cell,Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

import './home.css'
import axios from 'axios';
function Home() {
const [allBookedAppointment,setAllBookedAppointment]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:7000/api/admin/allbookedappointment")
        .then(res=>{
            console.log(res.data.result);
            setAllBookedAppointment(res.data.result);

        })
        .catch(err=>{console.log(err)})
    },[])

    
const [currentPage,setCurrentPage]=useState(1)
const recordsPerPage=10;
const lastIntex=currentPage*recordsPerPage;
const firstIndex=lastIntex-recordsPerPage;
const records= allBookedAppointment.slice(firstIndex,lastIntex);
const noOfPages=Math.ceil(allBookedAppointment.length/recordsPerPage);
const numbers=[...Array(noOfPages+1).keys()].slice(1);

const prePage=()=>{
    if(currentPage!==firstIndex)
    setCurrentPage(currentPage-1);
}
const nextPage=()=>{
    if(currentPage!==lastIntex)
    {
        setCurrentPage(currentPage+1);
    }

}
const changeCPage=(id)=>{
    setCurrentPage(id);


}

const [bookings,setBookings] = useState(0);
useEffect(()=>{
    axios.get('http://localhost:7000/api/branch/branches/appointment')
    .then(res=>{
        if(!res.data.Status){
            console.log(res.data.message)
        }else{
            console.log("Response for total bookings",res.data.result[0].Bookings);
            setBookings(res.data.result[0].Bookings);
        }   
})
.catch(err=>{
    console.log(err);

    })
    },[])

const [totalRevanue,setTotalRevanue] = useState(0);
useEffect(()=>{
    axios.get('http://localhost:7000/api/branch/branches/totalRevanue')
    .then(res=>{
        if(!res.data.Status){
            console.log(res.data.message)
        }else{
            console.log("Response for total Revanue",res.data.result[0].TotalRevenue);
            setTotalRevanue(res.data.result[0].TotalRevenue);
        }   
})
    .catch(err=>{
    console.log(err);

    })
    },[])


    const [cancelBookings,setCancelledBookings] = useState(0);
    useEffect(()=>{
    axios.get('http://localhost:7000/api/branch/branches/cancelledappointment')
    .then(res=>{
        if(!res.data.Status){
            console.log(res.data.message)
        }else{
            console.log("Response for total bookings",res.data.result[0].Bookings);
            setCancelledBookings(res.data.result[0].TotalCancelled);
        }   
        })
        .catch(err=>{
    console.log(err);
    })
    },[])
    
const [skinbooked,setSkinBooked] = useState(0);
useEffect(()=>{
axios.get('http://localhost:7000/api/branch/branches/skinbookedappointment')
.then(res=>{
    if(!res.data.Status){
        console.log(res.data.message)
    }else{
        console.log("Response for total skinBooked",res.data.result[0].SkinBooked);
        setSkinBooked(res.data.result[0].SkinBooked);
    }   
    })
    .catch(err=>{
console.log(err);
    })
    },[])
const [hairbooked,setHairBooked] = useState(0);
useEffect(()=>{
axios.get('http://localhost:7000/api/branch/branches/hairbookedappointment')
.then(res=>{
    if(!res.data.Status){
        console.log(res.data.message)
    }else{
        console.log("Response for total hairBooked",res.data.result[0].SkinBooked);
        setHairBooked(res.data.result[0].HairBooked);
    }   
    })
    .catch(err=>{
console.log(err);
    })
    },[])

const [makeupbooked,setMakeupBooked] = useState(0);
useEffect(()=>{
axios.get('http://localhost:7000/api/branch/branches/makeupbookedappointment')
.then(res=>{
    if(!res.data.Status){
        console.log(res.data.message)
    }else{
        console.log("Response for total makeupBooked",res.data.result[0].MakeupBooked);
        setMakeupBooked(res.data.result[0].MakeupBooked);
    }   
    })
    .catch(err=>{
console.log(err);
    })
    },[])

const [handandfeetbooked,setHandAndFeetBooked] = useState(0);
useEffect(()=>{
axios.get('http://localhost:7000/api/branch/branches/handandfeetbookedappointment')
.then(res=>{
    if(!res.data.Status){
        console.log(res.data.message)
    }else{
        console.log("Response for total handfeetBooked",res.data.result[0].HandAndFeet);
        setHandAndFeetBooked(res.data.result[0].HandAndFeet);
    }   
    })
    .catch(err=>{
console.log(err);
    })
    },[])


const data = [
    {
      name: 'SKIN',
      Booked: skinbooked,
      Cancelled: 20,
      amt: 2400,
    },
    {
      name: 'HAIR',
      Booked: 20,
      Cancelled:3,
      amt: 2210,
    },
    {
      name: 'MAKE UP',
      Booked: 50,
      Cancelled: 10.00,
      amt: 2290,
    },
    {
      name: 'HANDS & FEET',
      Booked: 90,
      Cancelled: 30,
      amt: 2000,
    },
   
  ];
  
const datap = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}
    



    return (
    <div className='homeContainer'>
        
        <div className='homewrapper'>
            {/* <div className='dash'>
                <p>Dashboard</p>
            </div> */}
            <div className='highlight'>
                <div className='highlightcard'>
                    <div className='cardItem book'>
                        <p>Total Booking</p>
                        <p>{bookings}</p>
                    </div>

                </div>
                <div className='highlightcard'>
                    <div className='cardItem cancel'>

                        <p>Cancelled Booking</p>
                        <p>{cancelBookings}</p>
                    </div>

                </div>
                <div className='highlightcard'>
                    <div className='cardItem complete'>
                        <p>Completed Booking</p>
                        <p>{bookings-cancelBookings}</p>
                    </div>
                </div>
                <div className='highlightcard'>
                    <div className='cardItem revenue'>
                        <p>Total Revenue</p>
                        <p>₹{totalRevanue}/-</p>
                    </div>
                </div>
            </div>





            <div className='barchart'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Booked" fill="green" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="Cancelled" fill="red" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </ResponsiveContainer>
                
               
                
            </div>
            <div>
                <div className='appointment'>
                <table border="1">
                    <thead >
                        <tr>
                            <th>AppointmentID</th>
                            <th>FirstName</th>
                            <th>Last Name</th>
                            <th>Branch Name</th>
                            <th>City Name</th>
                            <th>Booking Date</th>
                            <th>SlotTime</th>
                            <th>Status</th>
                            <th>Services</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(appointment=>(
                        <tr >
                            <td>{appointment.AppointmentID}</td>
                            <td>{appointment.FirstName}</td>
                            <td>{appointment.LastName}</td>
                            <td>{appointment.Branch_Name}</td>
                            <td>{appointment.Cities}</td>
                            <td>{appointment.Date}</td>
                            <td>{appointment.slotTime}</td>
                            <td>{appointment.Status}</td>
                            <td>{appointment.ServiceNames}</td>
                            <td>{appointment.Amount}</td>
                            {/* <td><button className='cancelbtn' onClick={()=>handleCancel(appointment.AppointmentID)}>Cancel</button>    </td> */}
                        </tr>
                        ))
                        }

                    
                    </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <a href='#' className='page-link'
                                onClick={prePage}>prev</a>
                            </li>
                            {
                                numbers.map((n,i)=>(
                                    <li className={`page-item ${currentPage===n ?'active':''}`} key={i}>
                                        <a href='#' className='page-link'
                                        onClick={()=>changeCPage(n)}>
                                            {n}
                                        </a>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <a href='#' className='page-link' 
                                onClick={nextPage}>Next</a>

                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home