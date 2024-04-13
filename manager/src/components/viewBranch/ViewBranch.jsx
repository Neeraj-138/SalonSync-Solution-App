import React, { useEffect, useState } from 'react'
import './branch.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
function Branch() {
  const[branch,setBranch]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:7000/api/branch/branches")
    .then(res=>
      setBranch(res.data.result)
    ).catch(err=>{
      console.log(err)
    })
  },[])
  console.log(branch);
  

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
                    {
                        branch.map((br,i)=>(
                            <tr key={i}>
                                <td>{br.bId}</td>
                                <td>{br.Name}</td>
                                <td>{br.City}</td>
                                <td>{br.District}</td>
                                <td>{br.State}</td>
                                <td>{br.PinCode}</td>
                                <td>
                                  <button className='edit link'><Link className='linkser' to={`/dashboard/updateBranch/${br.bId}`}>Edit</Link></button>
                                  <button className='danger' >Delete</button>
                                </td>
                                
                            
                            
                            </tr>


                        ))
                    }
 
                </tbody>
        </table>

      </div>
    
    </div>
  )
}

export default Branch