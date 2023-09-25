import Logo_1 from '../assets/logos/mine-rb.png';
import { NavLink } from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';
import {BsFillChatQuoteFill} from 'react-icons/bs'
import axios from 'axios';

import { MainContext } from './AppContect';
import { useContext, useState, useRef, useEffect} from 'react';
import {BiSolidUpArrow} from 'react-icons/bi';
import {GiCrossedBones} from 'react-icons/gi';

import Load1 from '../assets/pageImages/load-2.gif';


export const AlertMessage = ({children, type}) => {
     return(
          <div className={type === "success" ? "alertMessage success" : " alertMessage failure" }>
               {children}
          </div>
     )
}

export const Header = () => {

     const data = useContext(MainContext);

     return (
          <header className="Header">
               <div className="cont">
                    <div className="logo">
                         <img src={Logo_1} alt="Our Logo" />
                         <h2>Women Care</h2>
                    </div>
                    <div className="nav">
                         <NavLink to='/' onClick={() => data.setSearchOn(false) } >Home</NavLink>
                         <NavLink to='/about' onClick={() => data.setSearchOn(false) }>About Us</NavLink>
                         <NavLink to='/resources' onClick={() => data.setSearchOn(false) }>Services & Products</NavLink>
                         <div className='supportLink'>
                              <NavLink to='/support' onClick={() => data.setSearchOn(false) }>Support</NavLink>
                              <div className="supportLinks">
                                   <span><BiSolidUpArrow /></span>
                                   <div className='cont'>
                                        <NavLink to="/support?search=FAQs" onClick={() => data.setSearchOn(false) }>FAQs</NavLink>
                                        <NavLink to="/support?search=Contact-us" onClick={() => data.setSearchOn(false) }>Contact Us</NavLink>
                                   </div>
                              </div>
                         </div>
                         {/* <NavLink to='/e-shopping' onClick={() => data.setSearchOn(true) }>Our Shop</NavLink> */}
                         <NavLink to='/account-page' onClick={() => data.setSearchOn(false) }>Account</NavLink>
                    </div>
                    <div className= { data.searchOn || window.location === "/resources" ? 'search' : 'noDisplay'}>
                         <input type="text" placeholder="Search anything...." />
                         <button type="submit"><FiSearch /></button>
                    </div>
               </div>
          </header>
     )
}

const ChatBox = () => {
     const inputRef = useRef();
     const chatAreaRef = useRef();

     const [chatOn, setChatOn] = useState(false);
     const [messages, setMessages] = useState([
          {
               sender: "me",
               messageText: "Hello, how may I assist you today?"
          }
     ])

     const [input, setInput] = useState("");

     const answerMessage = async (req) => {

          const res = await axios.post('http://localhost:4000/api/chat/ask',{question: req});

          setMessages((prev => ([
               ...prev,
               {
                    sender: "me",
                    messageText: res.data.answer
               }
          ])))
     }    

     const sendMessage = () => {
          if(!input || input.trim() === "") {
              return console.log('Enter a message please')
          }else{
               setMessages((prev) => ([...prev, {
                    sender: "you",
                    messageText: input
               }]));
               
          }
          answerMessage(input);
          inputRef.current.value = "";
          setInput("")
     }

     const handleKey = (event) => {
          
          if(event.key === "Enter") {
               event.preventDefault();
               sendMessage();
          }
     } 

     useEffect(() => {
          if(chatAreaRef.current){
               chatAreaRef.current.scrollIntoView({behaviour: "smooth"});
          }
          
     }, [messages])

     if(chatOn){
          return(
               <div className='chat'>
                    <div className="chatBox">
                         <div className="header">
                              <h3>Women Care Bot</h3>
                              <i onClick={() => setChatOn(false)}><GiCrossedBones/></i>
                         </div>
                         <div className="chat-area">
                              {messages.map((message, index) => {
                                   if(message.sender === "me"){
                                        return(
                                             <div className="messageMe" key={index}>{message.messageText}</div>
                                        )
                                   }else if(message.sender === "you"){
                                        return(
                                             <div className="messageYou" key={index}>{message.messageText}</div>
                                        )
                                   }
                              })}
                              <div ref={chatAreaRef}></div>
                         </div>
                         <div className="input">
                              <textarea ref={inputRef} name="" id="" cols="105%" rows="1" onKeyDown={ handleKey} placeholder='Type your question here.....' required onChange={(e) => setInput(e.target.value)}></textarea>
                              <button onClick={sendMessage} type='submit' >Submit</button>
                         </div>
                    </div>
                    
               </div>
          )
     }else{
          return(
               <div className="chat">
                    <i onClick={() => setChatOn(true)}><BsFillChatQuoteFill/></i>
               </div>
          )
     }
     
}

export const Footer = () => {


     const data = useContext(MainContext);

     return(
          <footer className="Footer">
               <div className="row-1">
                    <div className="col">
                         <img src={Logo_1} alt="" />
                         <p>Women Care is a service provider agency that helps women be aware of healthy practices needed during their pregancy time </p>
                    </div>
                    <div className="col">
                         <h4>Our Company</h4>
                         <div className='links'>
                              <NavLink to='/about' onClick={() => data.setSearchOn(false) }>About Us</NavLink>
                              <NavLink to="/resources" onClick={() => data.setSearchOn(true) }>Resources</NavLink>
                              <NavLink>Careers</NavLink>
                              <NavLink>Privacy Policy</NavLink>
                              <NavLink>Terms and Conditions</NavLink>
                         </div>
                    </div>
                    <div className="col">
                         <h4>Social</h4>
                         <div className="links">
                              <NavLink>Instagram</NavLink>
                              <NavLink>facebook</NavLink>
                              <NavLink>Twitter</NavLink>
                              <NavLink>LinkedIn</NavLink>
                         </div>
                    </div>
                    <div className="col">
                         <h4>Support</h4>
                         <div className="links">
                              <NavLink to="/support?search=FAQs" onClick={() => data.setSearchOn(true) }>FAQs</NavLink>
                              <NavLink to="/support?search=Contact-us" onClick={() => data.setSearchOn(false) }>Contact Us</NavLink>
                              <NavLink>Live Chat</NavLink>
                         </div>
                    </div>
               </div>
               <div className="row"><p>2023 &#169; All rights reserved</p></div>
               <ChatBox />
          </footer>
     )
}

export const Loader = () => {
     return(
          <div className="loader"><img src={Load1} alt="Loading..." /></div>
     )
}
