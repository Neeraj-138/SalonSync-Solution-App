import React from 'react'
import './dashboard.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faLinkedin, faSquareFacebook, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocationDot, faLocationPin, faMobile, faMobileButton, faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';


import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
import NavLogin from '../navLogin/NavLogin';
function Dashboard() {
    const navigate=useNavigate();
    const handleLogOut=()=>{
        axios.get("http://localhost:7000/api/auth/logout")
        .then(
            res=>{
                navigate('/');
            }
        )
        .catch(
            err=>{console.log(err)
            }
        )
    }


    return (
    <div className='Container'>
                <NavLogin/>

        <div className='rowl'>

            <div className='leftbara'>
                <h4><FontAwesomeIcon icon={faAddressCard} ></FontAwesomeIcon>   Admin Dashboard</h4>
                <ul>
                    <li>    <Link to={'/dashboard'} className='link'>Dashboard</Link> </li>
                    <li><Link to={'/dashboard/service'} className='link'>Manage Service</Link> </li>
                    <li><Link to={'/dashboard/employee'} className='link'>Manage Employee</Link> </li>
                    {/* <li><Link to={'/dashboard/customer'} className='link'>Manage Customer</Link> </li> */}
                    <li><Link to={'/dashboard/booking'} className='link'>Manage Booking</Link> </li>
                    <li><Link to={'/dashboard/reviews'} className='link'>Manage Reviews</Link> </li>
                    <li><Link to={'/dashboard/branch'} className='link'>Manage Branch</Link> </li>
                    <li><Link to={'/dashboard/contact'} className='link'>Manage Contact</Link> </li>
                    <li><Link onClick={handleLogOut} className='link'>Logout</Link> </li>
                </ul>
            </div>
            <div className='outleti'>
                <Outlet/>
            </div>


        </div>
        
    
    
    </div>
  )
}

export default Dashboard