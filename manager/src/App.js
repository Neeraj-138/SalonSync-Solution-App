
import './App.css';
import {BrowserRouter,  Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Booking from './components/booking/Booking';
import Customer from './components/customer/Customer';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import AddService from './components/addservice/AddService'
import ViewService from './components/viewservice/ViewService';
import UpdateService from './components/updateservice/UpdateService';
import Branch from './components/viewBranch/ViewBranch';
import UpdateBranch from './components/updateBranch/UpdateBranch'
import AddBranch from './components/addbranch/AddBranch';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Employee from './components/employee/Employee';
import RequestEmployee from './components/requestEmployee/RequestEmployee';
import AddEmployee from './components/addEmployee/AddEmployee';
import UpdateEmployee from './components/updateEmployee/UpdateEmployee';
// import AddReviews from './components/addReviews/AddReviews';
import Reviews from './components/review/Reviews';
import AddReviews from './components/addReviews/AddReviews';
import UpdateReviews from './components/updateReviews/UpdateReviews';
import Contact from './components/contact/Contact';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/dashboard/service' element={<ViewService/>} />
            <Route path='/dashboard/updateService/:id' element={<UpdateService/>} />
            <Route path='/dashboard/add_service' element={<AddService/>} />
            <Route path='/dashboard/booking' element={<Booking/>} />
            <Route path='/dashboard/branch' element={<Branch/>} />
            <Route path='/dashboard/addBranch' element={<AddBranch/>} />
            <Route path='/dashboard/updateBranch/:id' element={<UpdateBranch/>} />
            <Route path='/dashboard/reviews' element={<Reviews/>} />
            <Route path='/dashboard/addreviews' element={<AddReviews/>} />
            <Route path='/dashboard/updatereviews/:id' element={<UpdateReviews/>} />
            <Route path='/dashboard/customer' element={<Customer/>} />
            <Route path='/dashboard/employee' element={<Employee/>} />
            <Route path='/dashboard/contact' element={<Contact/>} />
            <Route path='/dashboard/addEmployee' element={<AddEmployee/>} />
            <Route path='/dashboard/updateEmployee/:id' element={<UpdateEmployee/>} />
            <Route path='/dashboard/requestemployee' element={<RequestEmployee/>} />
            <Route path='/dashboard/profile' element={<Profile/>} />
          </Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
