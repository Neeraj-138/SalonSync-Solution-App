import React, { useEffect, useState } from 'react'
import './updateservice.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UpdateService() {

    const {id}=useParams();
    // const {city}=useParams();
    console.log("id useParamas",id);

//   const [service, setService] = useState("");
//   const [desc, setDesc] = useState("");
//   const [price, setPrice] = useState("");
//   const [link, setLink] = useState("");

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
//  const [updateService, setUpdateService] = useState('');
 const[updateService,setUpdateService]=useState({
    sId:"",
    service:"",
    description:"",
    price:"",
    Image:"",
    cId:"" 
}) 

  useEffect(() => {
    axios.get(`http://localhost:7000/api/service/getService/${id}`)
      .then(res => 
        {   console.log("serviceDetail",res.data.result[0])
            setUpdateService({
                sId: res.data.result[0].sId,
                service: res.data.result[0].Name,
                description: res.data.result[0].Description,
                price: res.data.result[0].Price,
                Image: res.data.result[0].Image,
                cId: res.data.result[0].cId,
               
              });
        })
      .catch(err => console.log(err));
  }, []);

  console.log(updateService)

  const [selectedBranch, setSelectedBranch] = useState('');
  const handleSelectBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const handleSelectCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const navigate = useNavigate();

  const handleUpdateService = (e) => {
    e.preventDefault();
    // console.log("add", service, desc, price, link, selectedBranch, selectedCategory);
    axios.put(`http://localhost:7000/api/service/updateService`, {finalbranch, updateService,selectedCategory })
      .then(res => {
        if(res.data.Status)
        {      setTimeout(() => {
              toast.success("Updated successfully")      
              }, 500);
            navigate('/dashboard/service');
        }     
        })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(()=>{
    // to get selected branch for a serivce
    axios.get(`http://localhost:7000/api/service/getSelectedBranchesForService/${id}`)
    .then(res =>
    {  console.log(res.data.result) 
      // setCategories(res.data.result)
      setFinalbranch(res.data.result)
    })
    .catch(err => console.log(err));

  },[])



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


  return (
    <div className='serContainer'>
    <div className='dash'>
      <p>Update Service</p>
    </div>
    <div className='serForm'>
      <h2>Update Service</h2>
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
                  <label htmlFor="categorySelect">Select Category:</label>
                      <select id="categorySelect" value={selectedCategory} onChange={handleSelectCategoryChange}>
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                          <option key={cat.cId} value={cat.cId}>{cat.CategoryName}</option>
                        ))}
                      </select>
                  </div>
          </div>
      
     

      <form>
        <input type='text' placeholder='Service Name' value={updateService.service} name='service' 
        // onChange={(e) => { setService(e.target.value) }} 
        onChange={(e) => setUpdateService({ ...updateService, service: e.target.value })}

        />
        <input type='text' placeholder='Description' name='desc'  value={updateService.description} 
        // onChange={(e) => { setDesc(e.target.value) }}
        onChange={(e) => setUpdateService({ ...updateService, description: e.target.value })}

         />
        <input type='text' placeholder='Link' name='link'  value={updateService.Image} 
        // onChange={(e) => { setLink(e.target.value) }} 
        onChange={(e) => setUpdateService({ ...updateService, Image: e.target.value })}

        />
        <input type='text' placeholder='Price' name='price'  value={updateService.price} 
        
        onChange={(e) => setUpdateService({ ...updateService, price: e.target.value })}

        />
        <button 
        onClick={handleUpdateService}
        >Update Service</button>
      </form>
    </div>
    <ToastContainer/>

  </div>
  )
}

export default UpdateService