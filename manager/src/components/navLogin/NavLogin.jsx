import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './navLogin.css'
// import jwt from 'jsonwebtoken';
import axios from 'axios'
// import { useSelector } from 'react-redux'
// import LogOut from '../../logout/LogOut';
function NavLogin() {
const [status,setStatus]=useState(true);
// const userId = useSelector((state) => state.auth.user.userId);
// console.log("from redux:",userId)
// const [id,setId]=useState("");

const[user,setUser]=useState(
  {ID: '',
  UserID: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Phone: '',
  Address: ''}
);
 useEffect(()=>{
//   if(userId){
//     axios.get(`http://localhost:7000/api/user/users/${userId}`,{},{ withCredentials: true })
//     .then(
//       res=>{
//         console.log(res.data.status)
//         // setId(userId);
//         setUser(res.data.result[0])
//         console.log("useEffect",user)
        
  
//       }
//     )
//     .catch(error=>{
//       console.log(error);
//     })
//   } 
 },[])
 
  const handleLogout=()=>{
    // console.log("clicked")
  axios.get("http://localhost:7000/api/auth/logout",{},{ withCredentials: true })
  .then(
    res=>{console.log(res)
      setStatus(res.data.Status);
    }
  )
  .catch(
    error=>{console.log(error)}
  )

 }
  return (
    <div className='nlcontainer'>
    <div className='nav'>
        <div className='logo'>
            <h3>BEAUTY SALON</h3>
        </div>
        <div className='button'>
            {/* {user.user.data&&user.user.data.Email?<p style={{ color: 'red' }}>{user.user.data.Email}</p>:( */}
              <div>
              {
                status?(
                  <div className='loginContent'>
                    <p>Neeraj Vishwakarma</p>
                
                </div>

                ):(                <> 
                </>
                )
              }
                
                
        
              </div>
            {/* )} */}
           
           
        </div>
    </div>
    </div>
  )
}

export default NavLogin