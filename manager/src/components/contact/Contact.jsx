import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function Contact() {
    const [key, setKey] = useState(0)
    const [contact,setContact]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:7000/api/admin/allcontacts")
        .then(res=>{
            console.log("AllContacts",res.data.result);
            setContact(res.data.result);

        })
        .catch(err=>{console.log(err)})
    },[key])
   const handleDelete=(id)=>{
    console.log("todelete",id)
    axios.delete(`http://localhost:7000/api/admin/deletecontact/${id}`)
        .then(res=>{
            if (res.data.Status) {
                toast.success("Deleted Successfully")
                setKey(prevKey => prevKey + 1);
            } else {
                console.error("API response is not an array:", res.data.result);
            }
        })
        .catch(err=>{console.log(err)})
    
   }
    
// const [currentPage,setCurrentPage]=useState(1)
// const recordsPerPage=7;
// const lastIntex=currentPage*recordsPerPage;
// const firstIndex=lastIntex-recordsPerPage;
// const records= contact.slice(firstIndex,lastIntex);
// const noOfPages=Math.ceil(contact.length/recordsPerPage);
// const numbers=[...Array(noOfPages+1).keys()].slice(1);

// const prePage=()=>{
//     if(currentPage!==firstIndex)
//     setCurrentPage(currentPage-1);
// }
// const nextPage=()=>{
//     if(currentPage!==lastIntex)
//     {
//         setCurrentPage(currentPage+1);
//     }

// }
// const changeCPage=(id)=>{
//     setCurrentPage(id);
// }
  return (
    <div className='homeContainer'>
        
    <div className='homewrapper'>
        <div className='dash'>
            <p>All Contacted List</p>
        </div>
        <div>
            <div className='appointment'>
            <table border="1"  style={{width:'100%'}} className='contacttable'>
                <thead >
                    <tr>
                        
                        <th>ContactId</th>
                        <th>Name</th>                   
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contact&&contact.map((contact,i)=>(
                        <tr style={{marginBottom:'5px',height:'40px'}}>
                            <td>{contact.contactId}</td>
                            <td>{contact.Name}</td>
                            <td>{contact.Email}</td>
                            <td>{contact.Mobile}</td>
                            <td>{contact.Message}</td>
                            <button style={{backgroundColor:'red',border:"none",margin:'5px',color:'white'}} onClick={()=>handleDelete(contact.contactId)}>Delete</button>
                        </tr>

                    ))

                    }
                  

                
                </tbody>
                </table>
                {/* <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link'
                            onClick={prePage}>prev</a>
                        </li>
                        {
                            numbers.map((n,i)=>(
                                <li className={`page-item ${currentPage===n ?'active':''}`} key={i}>
                                    <a href='#' className='page-link'
                                    onClick={()=>changeCPage(n)}>
                                        {n}
                                    </a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link' 
                            onClick={nextPage}>Next</a>

                        </li>
                    </ul>
                </nav> */}
            </div>
        </div>

    </div>
    <ToastContainer/>
</div>
  
)}

export default Contact