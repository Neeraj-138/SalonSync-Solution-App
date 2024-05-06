import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './viewservice.css'
function ViewService() {
    const navigate=useNavigate();
    const [service,setService]=useState([]);
    const[key,setKey]=useState(false);

    useEffect(()=>{
        axios.get('http://localhost:7000/api/service/getServices')
        .then( res=>{
            setService(res.data.result)
            console.log("updatedservice",res.data.result);
        })
        .catch(err=>console.log(err))
    },[key])
    const handleDelete=(sId)=>{
        console.log(sId);
        axios.delete(`http://localhost:7000/api/service/deleteService/${sId}`)
        .then(res=>{
            setKey(!key);
            setTimeout(() => {
                toast.success("Deleted successfully")      
                }, 500);
            navigate('/dashboard/service')
            })
        .catch(
            err=>{console.log(err)}
        )
    }
    


  return (
    <div className='addContainer'>
    <div className='dash'>
            <p>Service List</p>
        </div>
        <div className='addwrapper'>
            
            <Link className='linkB' to={"/dashboard/add_service"}> Add Service</Link>
       
        <table className=' table' border={1}>
                <thead>
                    <tr>
                        <th>S.Id</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>CategoryName</th>
                        <th>City</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        service.map((ser,i)=>(
                            <tr key={i}>
                                <td>{ser.sId}</td>
                                <td className='imga' ><img    src={ser.Image} alt=''></img></td>
                                <td>{ser.Name}</td>
                                <td>{ser.categoryName}</td>
                                <td>{ser.City}</td>
                                <td>{ser.Price}</td>
                                <td>
                                    <button className='linkS'><Link className='linkser'  to={ `/dashboard/updateService/${ser.sId}`} >Update</Link></button>
                                    <button className='danger' onClick={()=>handleDelete(ser.sId)}>Delete</button>
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

export default ViewService