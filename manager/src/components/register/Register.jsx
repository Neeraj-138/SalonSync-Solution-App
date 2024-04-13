import React, { useState } from 'react'
import './register.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import{ Link }from 'react-router-dom'

function Register() {
  const [value,setValue]=useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:"",
    Address:"",
    Password:""
  })
  const [error,setError]=useState('');
  // console.log(value);
  const navigate=useNavigate();
  const handleRegister=(e)=>{

    e.preventDefault();
    // console.log("registering");

    // console.log(value);
    axios.post("http://localhost:7000/api/auth/register",value)
    .then(
      res=>{
        // console.log(res.data.RegisterStatus);
        if(res.data.RegisterStatus)
        {   
          alert("Registered Successfully ")

          navigate('/login')
        }
        else{
          setError(res.data.Message)
        }
      }
    )
    .catch(
      err=>{
        console.log(err);
      }
    )
  }
 
  return (
    <div className='logContainer'>
      <div className='RegWrapper'>
        {
          error&&error
        }
        <h3>Register here..</h3>
        <div className='inputf'>
          <input type='text' placeholder='FirstName' name='FistName' onChange={(e)=>setValue({...value,FirstName:e.target.value})} />
          <input type='text' placeholder='LastName'  name='LastName' onChange={(e)=>setValue({...value,LastName:e.target.value})}/>
          <input type='email' placeholder='Email'  name='Email' onChange={(e)=>setValue({...value,Email:e.target.value})}/>
          <input type='number' placeholder='Mobile Number' name='Phone' onChange={(e)=>setValue({...value,Phone:e.target.value})}/>
          <input type='text' placeholder='Address'  name='Address' onChange={(e)=>setValue({...value,Address:e.target.value})}/>
          <input type='password' placeholder='Password'  name='Password' onChange={(e)=>setValue({...value,Password:e.target.value})}/>
          <button onClick={(e)=>handleRegister(e)}>Register</button>
         </div>
         <div>
          Already register ?
          <Link to={"/"}>Click here</Link>
         </div>
      </div>
    
    </div>
  )
}

export default Register