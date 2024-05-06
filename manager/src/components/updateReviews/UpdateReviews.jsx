import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function UpdateReviews() {
    const {id}=useParams();
    console.log("id",id);
    const[updateReview,setUpdateReview]=useState({
      
      Customer:"",
      Designation:"",
      Review:"",
       })
    useEffect(()=>{
      axios.get(`http://localhost:7000/api/admin/getreview/${id}`)
      .then(res=>{
            console.log(res.data.result)

         setUpdateReview({
          Customer:res.data.result[0].customerName,
          Designation:res.data.result[0].designation,
          Review:res.data.result[0].reviews,
        })        
      })
      .catch(err=>{console.log(err)})
    },[])
    const navigate=useNavigate();
    const handleUpdateReview=(e)=>{
      e.preventDefault()
        console.log("datato update",updateReview)
        axios.put(`http://localhost:7000/api/admin/updatereview/${id}`,updateReview)
        .then(res=>{
          if(res.data.Status)
          {
            console.log(res.data)
            // toast.success(res.data.result);
            setTimeout(() => {
              toast.success("Update successfully")
              
             }, 500);
            navigate('/dashboard/reviews')
          }
          // console.log(res)
        })
        .catch(err=>console.log(err))
      
      
      
      
       }
  return (
    <div className='updateContainer'>
    <div className='dash'>
       <p>Update Review</p>
   </div>
   <div className='updateWrapper'>
   <form>
           <input type='text' 
                value={updateReview.Customer} 
                onChange={(e)=>{setUpdateReview({...updateReview,Customer:e.target.value})}}
                placeholder='Customer Name'/>
           <input type='text' 
                value={updateReview.Designation}
                onChange={(e)=>{setUpdateReview({...updateReview,Designation:e.target.value})}} 
                placeholder='Designation'/>
            <textarea
                value={updateReview.Review}
                onChange={(e)=>{setUpdateReview({...updateReview,Review:e.target.value})}} 
            
                placeholder='Yout reviews ....'
            />          
           <button 
           onClick={(e)=>handleUpdateReview(e)}
           >Update Review</button>
       </form>
   </div>
   <ToastContainer/>
</div>
  )
}

export default UpdateReviews