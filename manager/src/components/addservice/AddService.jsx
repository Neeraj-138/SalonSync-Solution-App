import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addservice.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddService() {
  const [service, setService] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const [branches, setBranches] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7000/api/branch/branches")
      .then(res => setBranches(res.data.result))
      .catch(err => console.log(err));
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7000/api/service/serviceCategory")
      .then(res => setCategories(res.data.result))
      .catch(err => console.log(err));
  }, []);

  const [selectedBranch, setSelectedBranch] = useState('');
  const handleSelectBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const handleSelectCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const navigate = useNavigate();


  const[finalbranch,setFinalbranch]=useState([]);
  
  const handleCheckbox=(bId,Name,City,checked)=>{
    console.log("checked",checked);
    if(checked===true){
        // totalPrice=totalPrice+Price;
        setFinalbranch(prevState => [...prevState, { bId, Name, City }]);
       
    } else 
    {
        // Remove the selected service from the array
        setFinalbranch(prevState => prevState.filter(service => service.bId !== bId));
    }
   
}
console.log("selecting: ",finalbranch);
const handleAddService = (e) => {
  e.preventDefault();
  console.log("add", service, desc, price, link, finalbranch, selectedCategory);
  axios.post('http://localhost:7000/api/service/addService', { service, desc, price, link, finalbranch, selectedCategory })
    .then(res => {
      if(res.data.Status){
        setTimeout(() => {
          toast.success("Service Added successfully")
          
         }, 1000);
        navigate('/dashboard/service');

      }
    })
    .catch(err => {
      console.log(err);
    });
}

  return (
    <div className='serContainer'>
      <div className='dash'>
        <p>Add Service</p>
      </div>
      <div className='serForm'>
        <h2>Add Service</h2>
        {/* <label htmlFor="branchSelect">Select Branch:</label> */}
        <div className='timeslote'  data-aos='flip-left'>
                  {/* <div className='headingbr' >
                    <h4>Update Branch</h4>
                  </div> */}
                  <div className='Time'>
                  
                  {
                      branches.map(branch=>(
                          <div className='slot'>
                          <p>{branch.Name}</p>
                          <p>({branch.City})</p>
                       
                          <input type='checkbox'
                            onChange={(e) => handleCheckbox(branch.bId, branch.Name, branch.City, e.target.checked)}
                            checked={finalbranch.some(finalbranch => finalbranch.bId === branch.bId)} 
                          />
                      </div>
                      ))
                  }
                  
                  </div>
                  <div className='date'>
                  <label htmlFor="categorySelect" >Select Category:</label>
                      <select id="categorySelect" value={selectedCategory} onChange={handleSelectCategoryChange}>
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                          <option key={cat.cId} value={cat.cId}>{cat.CategoryName}</option>
                        ))}
                      </select>
                  </div>
          </div>
       

        <form>
          <input type='text' placeholder='Service Name' name='service' onChange={(e) => { setService(e.target.value) }} />
          <input type='text' placeholder='Description' name='desc' onChange={(e) => { setDesc(e.target.value) }} />
          <input type='text' placeholder='Link' name='link' onChange={(e) => { setLink(e.target.value) }} />
          <input type='text' placeholder='Price' name='price' onChange={(e) => { setPrice(e.target.value) }} />
          <button onClick={handleAddService}>Add</button>
        </form>

      </div>
        <ToastContainer/>
    </div>
  )
}

export default AddService;
