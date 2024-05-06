import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

function UpdateBranch() {
  const {id}=useParams();
  console.log("id",id);
  const[updateBranch,setUpdateBranch]=useState({
    id:"",
    name:"",
    street:"",
    city:"",
    district:"",
    state:"",
    pincode:"",
    location:""
})
  useEffect(()=>{
    axios.get(`http://localhost:7000/api/branch/branchById/${id}`)
    .then(res=>{
      
      setUpdateBranch({
        id:res.data.result[0].bId,
        name:res.data.result[0].Name,
        street:res.data.result[0].Street,
        city:res.data.result[0].City,
        district:res.data.result[0].District,
        state:res.data.result[0].State,
        pincode:res.data.result[0].PinCode,
        location:res.data.result[0].location,
      })        
    })
    .catch(err=>{console.log(err)})
  },[])
  const navigate=useNavigate();
 const handleUpdateBranch=(e)=>{
  
  // console.log(updateBranch);
  e.preventDefault()
  axios.put(`http://localhost:7000/api/branch/updateBranch/${updateBranch.id}`,updateBranch)
  .then(res=>{
    if(res.data.Status)
    {
      setTimeout(() => {
        toast.success("Updated successfully")      
        }, 500);
      navigate('/dashboard/branch')
    }
    // console.log(res)
  })
  .catch(err=>console.log(err))




 }
  return (
    <div className='updateContainer'>
         <div className='dash'>
            <p>Update Branch</p>
        </div>
        <div className='updateWrapper'>
        <form>
                <input type='number' value={updateBranch.id} onChange={(e)=>{setUpdateBranch({...updateBranch,id:e.target.value})}} placeholder='Branch Id'/>
                <input type='text' value={updateBranch.name} onChange={(e)=>{setUpdateBranch({...updateBranch,name:e.target.value})}} placeholder='Branch Name'/>
                <input type='text' value={updateBranch.street} onChange={(e)=>{setUpdateBranch({...updateBranch,street:e.target.value})}} placeholder='Street Name'/>
                <input type='text' value={updateBranch.city} onChange={(e)=>{setUpdateBranch({...updateBranch,city:e.target.value})}} placeholder='City Name'/>
                <input type='text' value={updateBranch.district} onChange={(e)=>{setUpdateBranch({...updateBranch,district:e.target.value})}}  placeholder='District'/>
                <input type='text' value={updateBranch.state} onChange={(e)=>{setUpdateBranch({...updateBranch,state:e.target.value})}}  placeholder='State'/>
                <input type='text' value={updateBranch.pincode} onChange={(e)=>{setUpdateBranch({...updateBranch,pincode:e.target.value})}}  placeholder='Pincode'/>
                <input type='text' value={updateBranch.location} onChange={(e)=>{setUpdateBranch({...updateBranch,location:e.target.value})}}  placeholder='Enter Branch Location Link'/>
                <button onClick={handleUpdateBranch}>Update Branch</button>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default UpdateBranch