import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

function Reviews() {
    const[review,setReview]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:7000/api/admin/allreviews')
        .then(res=>{
            console.log(res.data)
            setReview(res.data.result)
        })
        .catch(err=>console.log(err))
    },[])

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:7000/api/admin/deletereview/${id}`)
        .then(res=>
         {  if(res.data.Status){
          setTimeout(() => {
          toast.success("Updated successfully")      
          }, 500);
         }
           console.log(res.data)
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className='brContainer'>
    <div className='dash'>
          <p>Reviews List</p>
      </div>
    <div className='brWrapper'>

      <div className='addBranch'>
        <Link className='linkB' to={'/dashboard/addReviews'}>Add Review</Link>
      </div>
    <table className='table' border="1">
              <thead>
                  <tr>
                      <th>ReviewsId</th>
                      <th>Customer Name</th>
                      <th>Designation</th>
                      <th>Reviews</th>
        
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      review.map((br,i)=>(
                          <tr key={i}>
                              <td>{br.reviewsId}</td>
                              <td>{br.customerName}</td>
                              <td>{br.designation}</td>
                              <td>{br.reviews}</td>
                              <td>
                                <button className='edit link'><Link className='linkser' to={`/dashboard/updatereviews/${br.reviewsId}`}>Edit</Link></button>
                                <button className='danger' onClick={()=>handleDelete(br.reviewsId)} >Delete</button>
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

export default Reviews