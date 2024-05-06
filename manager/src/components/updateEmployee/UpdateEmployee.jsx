import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

function UpdateEmployee() {
  const {id}=useParams();
  console.log("id",id);
  const[updateEmployee,setUpdateEmployee]=useState({
    eId:"",
    brId:"",
    FirstName:"",
    LastName:"",
    Phone:"",
    Email:"",
    Verified:"",
 
})
// const [employee,setEmployee]=useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:7000/api/admin/employee/${id}`)
    .then(res=>{
        console.log("Employee",res.data.result);
        // setEmployee(res.data.result)
        setUpdateEmployee({
          eId: res.data.result.ID,
          brId: res.data.result.BranchID,
          FirstName: res.data.result.FirstName,
          LastName: res.data.result.LastName,
          Phone: res.data.result.Phone,
          Email: res.data.result.Email,
          Verified: res.data.result.Verified
        });
                
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  // console.log("deltails",employee)
  const navigate=useNavigate();
 const handleUpdateEmpoyee=(e)=>{
  e.preventDefault()
  console.log("toUptade",updateEmployee);
  
  axios.put(`http://localhost:7000/api/admin/updateemployee/${id}`,updateEmployee)
  .then(res=>{
    if(res.data.Status)
    {
      toast.success("Updated Successfully")
      navigate('/dashboard/branch')
    }
    // console.log(res)
  })
  .catch(err=>console.log(err))


 }

  return (
    <div className='updateContainer'>
         <div className='dash'>
            <p>Update Employee</p>
        </div>
        <div className='updateWrapper'>
        <form>
                <input type='number'
                 value={updateEmployee.eId}
                  onChange={(e)=>{setUpdateEmployee({...updateEmployee,eId:e.target.value})}}
                  placeholder='Employee Id'/>
                <input type='text' 
                value={updateEmployee.FirstName} 
                onChange={(e)=>{setUpdateEmployee({...updateEmployee,FirstName:e.target.value})}}
                 placeholder='First Name'/>
                <input type='text'
                 value={updateEmployee.LastName}
                 onChange={(e)=>{setUpdateEmployee({...updateEmployee,LastName:e.target.value})}} 
                 placeholder='Last Name'/>
                <input type='text'
                 value={updateEmployee.Email} 
                 onChange={(e)=>{setUpdateEmployee({...updateEmployee,Email:e.target.value})}}
                  placeholder='Email'/>
                <input type='text'
                 value={updateEmployee.Phone}
                  onChange={(e)=>{setUpdateEmployee({...updateEmployee,Phone:e.target.value})}} 
                  placeholder='Phone'/>
                <input type='text' 
                value={updateEmployee.brId}
                 onChange={(e)=>{setUpdateEmployee({...updateEmployee,brId:e.target.value})}} 
                 placeholder='BranchId'/>
                <input type='text'
                 value={updateEmployee.Verified}
                  onChange={(e)=>{setUpdateEmployee({...updateEmployee,Verified:e.target.value})}} 
                  placeholder='Verified'/>
                <button onClick={(e)=>handleUpdateEmpoyee(e)}>Update Employee</button>
            </form>
        </div>
 <ToastContainer/>
    </div>
  )
}

export default UpdateEmployee