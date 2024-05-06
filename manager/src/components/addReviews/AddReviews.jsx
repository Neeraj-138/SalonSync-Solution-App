import React, { useState } from 'react'
import './addReviews.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function AddReviews() {
  
  const [customer,setCustumer]=useState("");
  const navigate=useNavigate();
  const [designation,setDesignation]=useState("");
  const [link,setLink]=useState("");
  const [review,setReview]=useState("");
  // console.log(service)
 const handleAddReview=(e)=>{
  console.log(review,designation,customer);
  e.preventDefault();
    axios.post('http://localhost:7000/api/admin/addreview',{link,review,designation,customer})
    .then(res=>{
      setTimeout(() => {
        toast.success("Updated successfully")      
        }, 500);
      navigate('/dashboard/reviews')
    })
    .catch(err=>{
      console.log(err)}
      );

 }
  return (
    <div className='serContainer'>
     <div className='dash'>
            <p>Add Review</p>
        </div>
      <div className='serForm'>
        <h2>Add Review</h2>
        <form>
        <input type='text' placeholder='Custumer Name' name='service'
        onChange={(e)=>{setCustumer(e.target.value)}}
         />
        <input type='text' placeholder='Designation' name='desc'
        onChange={(e)=>{setDesignation(e.target.value)}}
         />
          <input type='text' placeholder='Image Link' name='link'
        onChange={(e)=>{setLink(e.target.value)}}
         />
         <textarea placeholder='Write review here...'
          onChange={(e)=>{setReview(e.target.value)}}
         >

         </textarea>
     
       <button 
       onClick={handleAddReview}
       >Add
       </button>
        </form>

      </div>
      <ToastContainer/>

    </div>
  )
}

export default AddReviews