import { Routes, Route, NavLink} from 'react-router-dom';
import AccountImage from '../assets/pageImages/account-2-rb.png';
import {ImHome} from 'react-icons/im'
import {LuUsers} from 'react-icons/lu';
import {GiDoctorFace} from 'react-icons/gi'
import {MdHomeRepairService, MdProductionQuantityLimits} from 'react-icons/md';
import {BsFillChatSquareQuoteFill} from 'react-icons/bs'
import {AiTwotoneSetting, AiOutlineLogout} from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import  {Loader} from './components'
import axios from 'axios';

const Nav = () => {

     return(
          <div className="Nav">
               <div className="logo">
                    <img src={AccountImage} alt="Account image" />
               </div>
               <div className="nav">
                    <NavLink to=""><ImHome /></NavLink>
                    <NavLink to="manage-users"><LuUsers /></NavLink>
                    <NavLink to="manage-doctors"><GiDoctorFace /></NavLink>
                    <NavLink to="user-comments"><BsFillChatSquareQuoteFill /></NavLink>
                    <NavLink to="settings"><AiTwotoneSetting /></NavLink>
                    <NavLink to="/"><AiOutlineLogout /></NavLink>
               </div>
          </div>
     )
}

const Home = () => {
     return(
          <div className="admin-home">
               <div className="intro">
                    <h1>Admin Dashboard</h1>
               </div>
               <div className="cont">
                    <div className="container">
                         <h2>Users</h2>
                         <NavLink to="manage-users"><LuUsers /></NavLink>
                         <p>Patients registered</p>
                    </div>
                    <div className="container">
                         <h2>Doctors</h2>
                         <NavLink to="manage-doctors"><GiDoctorFace /></NavLink>
                         <p>Doctors </p>
                    </div>
                    <div className="container">
                         <h2>Services</h2>
                         <NavLink to="manage-services"><MdHomeRepairService /></NavLink>
                         <p>6 services posted </p>
                    </div>
                    <div className="container">
                         <h2>Products</h2>
                         <NavLink to="manage-products"><MdProductionQuantityLimits /></NavLink>
                         <p>40 products in store </p>
                    </div>
                    <div className="container">
                         <h2>User comments</h2>
                         <NavLink to="user-comments"><BsFillChatSquareQuoteFill /></NavLink>
                         <p>Check user comments</p>
                    </div>
                    <div className="container">
                         <h2>Settings</h2>
                         <NavLink to="settings"><AiTwotoneSetting /></NavLink>
                         <p>Customise to you best look.</p>
                    </div>
               </div>
          </div>
     )
}

const Users = () => {
     
     const [patients, setPatients] = useState([]);

     const getDoctors =  async () => {
          try {
               const res = await axios.get('http://localhost:4000/api/patients/get-patients');
               setPatients(res.data.patients);
          } catch (error) {
               console.error("Server error")
          }
     }

     const [page, setPage] = useState(1); 

     useEffect(() => {
          getDoctors();
     }, []);
     return(
          <div className="admin-doctors">
               <div className="intro">
                    <h1>Patients</h1>
               </div>
               <div className="cont">
                    <div className="page">
                       {
                         patients[0] ? (
                              patients.map((doctor, index) => {
                                   return(
                                        <div className="doctor" key={index}>
                                             <img src={ doctor.image || AccountImage} alt={`${doctor.name} - Image`} />
                                             <h3>Dr. {doctor.name}</h3>
                                             <p>{doctor.email}</p>
                                             <div className="row">
                                                  <span>Active</span>
                                                  <button>Update</button>
                                                  <button>Delete</button>
                                             </div>
                                        </div>
                                   )
                              })
                         ) : (<Loader />)
                       }
                    </div>
                    <div className='pagination'>
                         <span className={page === 1 ? "active" : ""}  onClick={() => setPage(1)}>1</span>
                         <span className={page === 2 ? "active" : ""}  onClick={() => setPage(2)}>2</span>
                         <span className={page === 3 ? "active" : ""}  onClick={() => setPage(3)}>3</span>
                    </div>
               </div>
          </div>
     )
}

const Doctors = () => {

     const [doctors, setDoctors] = useState([]);

     const getDoctors =  async () => {
          try {
               const res = await axios.get('http://localhost:4000/api/doctors/get-doctors');
               setDoctors(res.data.doctors);
          } catch (error) {
               console.error("Server error")
          }
     }

     const [page, setPage] = useState(1); 

     useEffect(() => {
          getDoctors();
     }, []);
     return(
          <div className="admin-doctors">
               <div className="intro">
                    <h1>Doctors</h1>
               </div>
               <div className="cont">
                    <div className="page">
                       {
                         doctors[0] ? (
                              doctors.map((doctor, index) => {
                                   return(
                                        <div className="doctor" key={index}>
                                             <img src={ doctor.image || AccountImage} alt={`${doctor.name} - Image`} />
                                             <h3>Dr. {doctor.name}</h3>
                                             <p>{doctor.email}</p>
                                             <div className="row">
                                                  <span>Active</span>
                                                  <button>Update</button>
                                                  <button>Delete</button>
                                             </div>
                                        </div>
                                   )
                              })
                         ) : (<Loader />)
                       }
                    </div>
                    <div className='pagination'>
                         <span className={page === 1 ? "active" : ""}  onClick={() => setPage(1)}>1</span>
                         <span className={page === 2 ? "active" : ""}  onClick={() => setPage(2)}>2</span>
                         <span className={page === 3 ? "active" : ""}  onClick={() => setPage(3)}>3</span>
                    </div>
               </div>
          </div>
     )
}

const LiveChat = () => {
     const [questions, setQuestions] = useState([]);

     const getQuestions  = async () => {
          const res = await axios.get('http://localhost:4000/api/questions/client-messages');
          setQuestions((res.data.questions));

     }

     useEffect(() => {
          getQuestions();
     }, []);

     return(
          <div className="admin-chat">
               <div className="intro">
                    <h1>User comments</h1>
               </div>
               <div className="body-que">
                    <table>
                         <thead>
                              <tr>
                                   <td>Name</td>
                                   <td>Email</td>
                                   <td>Phone</td>
                                   <td>Message</td>
                              </tr>
                         </thead>
                         <tbody>
                              {!questions[0] ? <h3>No questions from clients</h3> : questions.map((que, index) => (
                                   <tr key={index}>
                                        <td>{que.name}</td>
                                        <td>{que.email}</td>
                                        <td>{que.phone}</td>
                                        <td >{que.message}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

const Settings = () => {
     return(
          <div className="admin-settings">
               <h1>currently no settings available.....</h1>
          </div>
     )
}

const AdminDashboard = () => {
  return (
    <div className='AdminMain'>
     <Nav />
     <div className="body">
          <Routes>
               <Route path='' element={<Home />} />
               <Route path='manage-users' element={<Users />} />
               <Route path='manage-doctors' element={<Doctors />} />
               <Route path='user-comments' element={<LiveChat />} />
               <Route path='settings' element={<Settings />} />
          </Routes>
     </div>
    </div>
  )
}

export default AdminDashboard