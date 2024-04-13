import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateEmployee() {
  const {id}=useParams();
  console.log("id",id);
  const[updateBranch,setUpdateBranch]=useState({
    eId:"",
    brId:"",
    FirstName:"",
    LastName:"",
    Phone:"",
    Email:"",
    Verified:"",
 
})
const [employee,setEmployee]=useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:7000/api/admin/employee/${id}`)
    .then(res=>{
        console.log("Employee",res.data.result);
        setEmployee(res.data.result)
        setUpdateBranch({
            eId:res.data.res,
            brId:"",
            FirstName:"",
            LastName:"",
            Phone:"",
            Email:"",
            Verified:"",
        // id:res.data.result[0].bId,
        // name:res.data.result[0].Name,
        // street:res.data.result[0].Street,
        // city:res.data.result[0].City,
        // district:res.data.result[0].District,
        // state:res.data.result[0].State,
        // pincode:res.data.result[0].PinCode,
      })        
    })
    .catch(err=>{console.log(err)})
  },[id])
  const navigate=useNavigate();
 const handleUpdateBranch=()=>{
  
  // console.log(updateBranch);
  
  axios.put(`http://localhost:7000/api/admin/updateemployee/${updateBranch.id}`,updateBranch)
  .then(res=>{
    if(res.data.Status)
    {
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
                <input type='number' value={updateBranch.id} onChange={(e)=>{setUpdateBranch({...updateBranch,id:e.target.value})}} placeholder='Branch Id'/>
                <input type='text' value={updateBranch.name} onChange={(e)=>{setUpdateBranch({...updateBranch,name:e.target.value})}} placeholder='Branch Name'/>
                <input type='text' value={updateBranch.street} onChange={(e)=>{setUpdateBranch({...updateBranch,street:e.target.value})}} placeholder='Street Name'/>
                <input type='text' value={updateBranch.city} onChange={(e)=>{setUpdateBranch({...updateBranch,city:e.target.value})}} placeholder='City Name'/>
                <input type='text' value={updateBranch.district} onChange={(e)=>{setUpdateBranch({...updateBranch,district:e.target.value})}}  placeholder='District'/>
                <input type='text' value={updateBranch.state} onChange={(e)=>{setUpdateBranch({...updateBranch,state:e.target.value})}}  placeholder='State'/>
                <input type='text' value={updateBranch.pincode} onChange={(e)=>{setUpdateBranch({...updateBranch,pincode:e.target.value})}}  placeholder='Pincode'/>
                <button onClick={handleUpdateBranch}>Update Employee</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateEmployee