import {React, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddService() {
  const [service,setService]=useState("");
  const navigate=useNavigate();
  const [desc,setDesc]=useState("");
  const [price,setPrice]=useState("");
  // console.log(service)
 const handleAddService=(e)=>{
  console.log(service,desc,price);
  e.preventDefault();
    axios.post('http://localhost:7000/api/service/addService',{service,desc,price})
    .then(res=>{
      navigate('/dashboard/service')
    })
    .then(err=>{
      console.log(err)}
      );

 }
  return (
    <div className='serContainer'>
     <div className='dash'>
            <p>Add Service</p>
        </div>
      <div className='serForm'>
        <h2>Add Service</h2>
        <form>
        <input type='text' placeholder='Service Name' name='service'onChange={(e)=>{setService(e.target.value)}} />
        <input type='text' placeholder='Description' name='desc'onChange={(e)=>{setDesc(e.target.value)}} />
        <input type='text' placeholder='Price' name='price'onChange={(e)=>{setPrice(e.target.value)}} />
       <button onClick={handleAddService}>Add</button>
        </form>

      </div>

    </div>
  )
}

export default AddService