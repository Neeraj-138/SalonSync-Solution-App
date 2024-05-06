import  { useEffect, useState } from 'react'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './booking.css'
import axios from 'axios';
function Booking() {

  
    const [selectedDate, setSelectedDate] = useState('');

    const [allBookedAppointment,setAllBookedAppointment]=useState([]);
    useEffect(() => {
        if (selectedDate !== '') {
            axios.get(`http://localhost:7000/api/admin/allbookedappointmentbydate?date=${selectedDate}`)
                .then(res => {
                    console.log("AllAppointment byDATE", res.data.result);
                    setAllBookedAppointment(res.data.result);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios.get("http://localhost:7000/api/admin/allbookedappointment")
                .then(res => {
                    console.log("AllAppointment", res.data.result);
                    setAllBookedAppointment(res.data.result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [selectedDate]);

    // useEffect(()=>{
    //     axios.get("http://localhost:7000/api/admin/allbookedappointment")
    //     .then(res=>{
    //         console.log("AllAppointment",res.data.result);
    //         setAllBookedAppointment(res.data.result);

    //     })
    //     .catch(err=>{console.log(err)})
    // },[])

    
const [currentPage,setCurrentPage]=useState(1)
const recordsPerPage=7;
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
const handleDateChange = (e) => {
    // setSelectedDate(formatDate(e.target.value));
    // setSelectedDate(formattedDate);
    const formattedDate = formatDate(e.target.value);
    setSelectedDate(formattedDate);
}
console.log("choosenDate",selectedDate)
const formatDate = (date) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};

    return (
    <div className='homeContainer'>
        
        <div className='homewrapper'>
            <div className='dash'>
                <p>All Appointment</p>
            </div>
            <input type='date' value={selectedDate} onChange={handleDateChange} />
                <h2>{selectedDate}</h2>
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
                            <td>{appointment.City}</td>
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

export default Booking