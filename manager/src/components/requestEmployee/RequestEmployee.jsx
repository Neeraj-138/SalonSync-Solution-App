import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function RequestEmployee() {
    const [employee,setEmployee]=useState([]);
    const[key,setKey]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:7000/api/admin/requestemployee")    
        .then( res=>{
            setEmployee(res.data.result);
            console.log("Employee",res.data.result)
        } )
        .catch(
            err=>console.log(err)
        )
    
    
    },[key])

  const handleAccept=(ID)=>{
    console.log("employee",ID)
    axios.post(`http://localhost:7000/api/admin/acceptrequest/${ID}`)
    .then( 
      res=>{
        if(res.data.Status)
        {
          toast.success(res.data.Message)
          setKey(prevKey=>prevKey+1)
          console.log(res.data.Message);
          
        }
      }
     )
    .catch(err=>{console.log(err)} )
  }

  const handleReject=(ID)=>{
    console.log("employee",ID)
    axios.post(`http://localhost:7000/api/admin/rejectrequest/${ID}`)
    .then( 
      res=>{
        if(res.data.Status)
        {
          console.log(res.data.Message);
        }
      }
     )
    .catch(err=>{console.log(err)} )
  }






  return (
    <div className='brContainer'>
    <div className='dash'>
          <p>Requested For Employee</p>
       
      </div>
    <div className='brWrapper'>

      <div className='addBranch'>
        {/* <Link className='linkB' to={'/dashboard/addBranch'}>Add Employee</Link>
        <Link className='linkB' to={'/dashboard/addBranch'}>Request</Link> */}
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
                      <th>Resume</th>
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
                                <button className='edit link'><Link className='linkser'onClick={()=>handleAccept(e.ID)} >Accept</Link></button>
                                {/* <button className='danger' onClick={()=>handleReject(e.ID)} >Reject</button> */}
                              </td>
                          </tr>


                      ))
                  }

              </tbody>
      </table>

    </div>
    <ToastContainer/>
  </div>
  )
}

export default RequestEmployee