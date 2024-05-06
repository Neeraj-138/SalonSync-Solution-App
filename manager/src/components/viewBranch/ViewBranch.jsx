import React, { useEffect, useState } from 'react'
import './branch.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function Branch() {
  const[branch,setBranch]=useState([]);
  const[key,setKey]=useState(false);

  useEffect(()=>{
    axios.get("http://localhost:7000/api/branch/branches")
    .then(res=>
      setBranch(res.data.result)
    ).catch(err=>{
      console.log(err)
    })
  },[key])
  console.log(branch);
  const handleDelete=(bId)=>{
    console.log("deleteing",bId);
    axios.delete(`http://localhost:7000/api/branch/deletebranch/${bId}`)
    .then(res=>{
        setKey(!key)
        setTimeout(() => {
        toast.success("Deleted successfully",res.data.Status)      
        }, 500);
      }
    ).catch(err=>{
      console.log(err)
    })
  }
  

  return (
    <div className='brContainer'>
      <div className='dash'>
            <p>Branch List</p>
        </div>
      <div className='brWrapper'>

        <div className='addBranch'>
          <Link className='linkB' to={'/dashboard/addBranch'}>Add Branch</Link>
        </div>
      <table className='table' border="1">
                <thead>
                    <tr>
                        <th>BranchId</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>District</th>
                        <th>State</th>
                        <th>PinCode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(branch) && branch.length > 0 ? (
              branch.map((br, i) => (
                <tr key={i}>
                  <td>{br.bId}</td>
                  <td>{br.Name}</td>
                  <td>{br.City}</td>
                  <td>{br.District}</td>
                  <td>{br.State}</td>
                  <td>{br.PinCode}</td>
                  <td>
                    <button className='edit link'>
                      <Link className='linkser' to={`/dashboard/updateBranch/${br.bId}`}>Edit</Link>
                    </button>
                    <button className='danger' onClick={() => handleDelete(br.bId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No branches found</td>
              </tr>
            )}
                </tbody>
        </table>

      </div>
      <ToastContainer/>
    
    </div>
  )
}

export default Branch