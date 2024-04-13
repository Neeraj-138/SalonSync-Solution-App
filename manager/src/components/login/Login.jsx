import React, {useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './login.css'
// import {useDispatch} from '@reduxjs/toolkit';
// import {useDispatch} from 'react-redux';
// import { loginFailure, loginSuccess } from '../../store/authSlice';
function Login() {
  const [value,setValue]=useState({
    Email:"",
    Password:"",
})
// const dispatch = useDispatch();

// console.log(value)
const [error,setError]=useState("");

const navigate=useNavigate();


const handleLogin=(e)=>{
  e.preventDefault();
  console.log("LoginData",value);
  axios.post("http://localhost:7000/api/auth/login",value,{ withCredentials: true})
  .then(res=>{
    
        console.log("response from the server",res.data);
        if(res.data.loginStatus)
        {
        console.log("Email:", res.data.user.UserID)
        //   dispatch(loginSuccess({ data: res.data.user, userId:res.data.user.UserID}));
        navigate('/dashboard')
        }
        else{
        //   dispatch(loginFailure(res.data.Message));
        setError(res.data.Message)
        }
  })
  .catch(error=>{
      setError(error.message)
     if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Server responded with a non-2xx status", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request", error.message);
    }
  })

}

  return (
    <div className='logContainer'>
      <div className='logWrapper'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <h3>Login As Admin</h3>

        <div className='inputf'>
          <input type='email' placeholder='Email' name='Email' onChange={(e)=>setValue({...value,Email:e.target.value})} />
          <input type='password' placeholder='Password' name='Password' onChange={(e)=>setValue({...value,Password:e.target.value})}/>
         
          <button 
          onClick={(e)=>handleLogin(e)}
          >Login</button>
         </div>
         <div>Did not have account? 
            <Link to={'/register'}> Click here</Link>
         </div>

      </div>
    
    </div>
  )
}

export default Login