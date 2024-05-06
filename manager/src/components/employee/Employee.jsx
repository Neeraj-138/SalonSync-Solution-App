import React, { useEffect, useState } from 'react'
import './employee.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function Employee() {
    const [employee,setEmployee]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:7000/api/admin/allemployee")    
        .then( res=>{
            setEmployee(res.data.result);
            console.log("Employee",res.data.result)
        } )
        .catch()
    
    
    },[])
  return (
    <div className='brContainer'>
    <div className='dash'>
          <p>Employee List</p>
       
      </div>
    <div className='brWrapper'>

      <div className='addBranch'>
        {/* <Link className='linkB' to={'/dashboard/addEmployee'}>Add Employee</Link> */}
        <Link className='linkB' to={'/dashboard/requestemployee'}>Request</Link>
      </div>
    <table className='table' border="1">
              <thead>
                  <tr>
                      <th>EmployeeId</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Branch Id</th>
                      <th>Verified</th>
                      <th>Resume Link</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      employee.map((e,i)=>(
                          <tr key={i}>
                              <td>{e.ID}</td>
                              <td>{e.FirstName}</td>
                              <td>{e.LastName}</td>
                              <td>{e.Email}</td>
                              <td>{e.Phone}</td>
                              <td>{e.BranchID}</td>
                              <td>{e.Verified}</td>
                              <td><a href={`http://localhost:7000/uploads/${e.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a></td>

                              <td>
                                <button className='edit link'><Link className='linkser' to={`/dashboard/updateEmployee/${e.ID}`}>Edit</Link></button>
                                <button className='danger' >Suspend</button>
                              </td>
                          </tr>


                      ))
                  }

              </tbody>
      </table>

    </div>
  
  </div>
  )
}

export default Employee