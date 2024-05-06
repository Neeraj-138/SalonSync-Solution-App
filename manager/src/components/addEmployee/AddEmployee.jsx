import React, { useEffect, useState } from 'react'
// import './updateservice.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
function UpdateService() {
    const {id}=useParams();
    console.log(id);
    const [service,setService]=useState({
        Name:"",
        Description:"",
        Price:""
    })
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:7000/api/service/getService/${id}`)
        .then(res=>{
            console.log(res.data.result);
            setService({
                ...service,
                Name: res.data.result[0].Name,
                Price: res.data.result[0].Price,
                Description: res.data.result[0].Description
            });
        })
        .catch(
            err=>console.log(err)
        )

    },[])
    console.log("getting",service);

    const handleUpadate=(e)=>{
        e.preventDefault()
        console.log("TO update")
        axios.put(`http://localhost:7000/api/service/updateService/${id}`,service)
        .catch(res=>{
            // console.log(res.data.Status);
            // if(res.data.Status){
                console.log("response form backend",res.data)
                alert("Successfully updated")
                // navigate('/dashboard/service')
            // }
        })
        .then(err=>console.log(err)
        )
    }

  return (
    <div className='serContainer'>
    <div className='dash'>
            <p>Update Service</p>
        </div>
    <div className='serForm'>
      <h2>Update Service</h2>
      <form>
      <input type='text' placeholder='Service Name' name='service'
        value={service.Name}
            onChange={(e)=>{setService({...service,Name:e.target.value})}}
       />
      <input type='text' placeholder='Description' name='desc'
        value={service.Description}
        onChange={(e)=>{setService({...service,Description:e.target.value})}}

        />
      <input type='text' placeholder='Price' name='price'
        value={service.Price}
            onChange={(e)=>{setService({...service,Price:e.target.value})}} 
        />
     <button onClick={(e)=>handleUpadate(e)} >Update</button>
      </form>

    </div>

  </div>
  )
}

export default UpdateService