import axios from 'axios';
import {React,  useState } from 'react'
import {useNavigate} from 'react-router-dom'

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import './addbrach.css'
function AddBranch() {
    const navigate=useNavigate()
    const[branch,setBranch]=useState({
        id:"",
        name:"",
        street:"",
        city:"",
        district:"",
        state:"",
        pincode:"",
        location:""
    })
    const handleAddBranch=(e)=>{
        e.preventDefault();
        console.log("Branch",branch);

        axios.post("http://localhost:7000/api/branch/branch",branch)
        .then(res=>{
            if(res.data.Status)
            {
                setTimeout(() => {
                    toast.success("Updated successfully")      
                    }, 500);
                navigate('/dashboard/branch')
            }
            console.log(res.data.result)
        } )
        .catch(err=>{console.log(err)
        })
    }

    return (
    <div className='addBranchContainer'>
     <div className='dash'>
            <p>Add Branch</p>
        </div>
        <div className='addbranchWrapper'>
            <form>
                <input type='number' onChange={(e)=>{setBranch({...branch,id:e.target.value})}} placeholder='Branch Id'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,name:e.target.value})}} placeholder='Branch Name'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,street:e.target.value})}} placeholder='Street Name'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,city:e.target.value})}} placeholder='City Name'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,district:e.target.value})}}  placeholder='District'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,state:e.target.value})}}  placeholder='State'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,pincode:e.target.value})}}  placeholder='Pincode'/>
                <input type='text' onChange={(e)=>{setBranch({...branch,location:e.target.value})}}  placeholder='Enter Branch Loction Link'/>
                <button onClick={handleAddBranch}>Add Branch</button>
            </form>

        </div>
        <ToastContainer/>
    </div>
  )
}

export default AddBranch