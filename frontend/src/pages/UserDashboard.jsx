import { Routes, Route, NavLink } from 'react-router-dom';
import AccountImage from '../assets/pageImages/account-2-rb.png';
import {ImHome} from 'react-icons/im'
import {GiDoctorFace} from 'react-icons/gi'
import {MdHomeRepairService, MdProductionQuantityLimits} from 'react-icons/md';
import {BsFillChatSquareQuoteFill} from 'react-icons/bs'
import {AiTwotoneSetting, AiOutlineLogout} from 'react-icons/ai';
import {SiProgress} from 'react-icons/si';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Nav = () => {

  return(
       <div className="Nav">
            <div className="logo">
                 <img src={AccountImage} alt="Account image" />
            </div>
            <div className="nav">
                 <NavLink to=""><ImHome /></NavLink>
                 <NavLink to="progress"><SiProgress /></NavLink>
                 <NavLink to="live-chat"><GiDoctorFace /></NavLink>
                 <NavLink to="services"><MdHomeRepairService /></NavLink>
                 <NavLink to="shop"><MdProductionQuantityLimits /></NavLink>
                 <NavLink to="chat-bot"><BsFillChatSquareQuoteFill /></NavLink>
                 <NavLink to="user-support"><AiTwotoneSetting /></NavLink>
                 <NavLink><AiOutlineLogout /></NavLink>
            </div>
       </div>
  )
}

const Home = () => {
  return(
       <div className="user-home">
            <div className="intro">
                 <h1>Patient Dashboard</h1>
            </div>
            <div className="cont">
                 <div className="container">
                      <NavLink to="progress"><SiProgress /></NavLink>
                      <p>Check you progress</p>
                 </div>
                 <div className="container">
                      <NavLink to="live-chat"><GiDoctorFace /></NavLink>
                      <p>Talk to doctor</p>
                 </div>
                 <div className="container">
                 <NavLink to="services"><MdHomeRepairService /></NavLink>
                      <p>check our services</p>
                 </div>
                 <div className="container">
                      <NavLink to="shop"><MdProductionQuantityLimits /></NavLink>
                      <p>Check out our products</p>
                 </div>
                 <div className="container">
                      <NavLink to="chat-bot"><BsFillChatSquareQuoteFill /></NavLink>
                      <p>Chat with our bot</p>
                 </div>
                 <div className="container">
                      <NavLink to="user-support"><AiTwotoneSetting /></NavLink>
                      <p>User Support</p>
                 </div>
            </div>
       </div>
  )
}

const Progress = () => {
  return(
    <div className="progress">
      <h1>You are viewing progress</h1>
    </div>
  )
}

const Shop = () => {
  return(
    <div className="progress">
      <h1>You are viewing shop</h1>
    </div>
  )
}

const Services = () => {
  return(
    <div className="progress">
      <h1>You are viewing Services</h1>
    </div>
  )
}

const Support = () => {
  return(
    <div className="user-support">
      <h1>You are viewing support page</h1>
    </div>
  )
}

const Chatbot = () => {
  return(
    <div className="progress">
      <h1>You are viewing Chatbot</h1>
    </div>
  )
}


const  DoctorChat = () => {
  const [chatUser, setChatUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [patients, setPatients] = useState([]);

  const getPatients = async () => {
       try {
            const res = await axios.get('http://localhost:4000/api/patients/get-patients');
       const patients = res.data;
       setPatients(patients);
       } catch (error) {
            console.log(error)
       }
  }
  useEffect(() => {
       getPatients();
  }, [])
  return(
       <div className="admin-chat">
            <div className="intro">
                 <h1>Your community</h1>
            </div>
            <div className="body">
                 <div className="chatAdmin">
                      <div className="col-1">
                           {patients[0] ? patients.map((patient) => (
                                <div className="chat-row" key={patient.id}>
                                     <img src={patient.image} alt={patient.name} />
                                     <h4>{patient.name}</h4>
                                </div>
                           )) : (
                                <h2>No patient messages availabe</h2>
                           )}
                      </div>
                      <div className="col-2">
                           <div className="header-row">
                                <h4>{chatUser.name}</h4>
                           </div>
                           <div className="chat-box">
                                {messages[0] ? messages.map((message, index) => (
                                     <div className={message.sender === "patient" ? "patient" : "doctor"} key={index}>
                                          {message.content}
                                     </div>
                                )) : (
                                     <p>No conversation current</p>
                                )}
                           </div>
                           <div className="message">
                                <textarea name="message" id="message" cols="30" rows="10" placeholder='Message'></textarea>
                                <button type='submit'>Send</button>

                           </div>
                      </div>
                 </div>
            </div>
       </div>
  )
}

const UserDashboard = () => {
  return (
    <div className="UserMain">
      <Nav />
     <div className="body">
          <Routes>
              <Route path='' element={<Home />} />
              <Route path='progress' element={<Progress />} />
              <Route path='shop' element={<Shop />} />
              <Route path='services' element={<Services />} />
              <Route path='support' element={<Support />} />
              <Route path='chat-bot' element={<Chatbot />} />
              <Route path='live-chat' element={<DoctorChat/>} />
               
          </Routes>
     </div>
    </div>
  )
}

export default UserDashboard