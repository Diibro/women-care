import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {BsChevronDown , BsChevronUp}  from 'react-icons/bs';
import { Loader } from "./components";


const Support = () => {
  const [questions, setQuestions] = useState({});
  const [userData, setUserData] = useState({});
  const formRef = useRef();

  const getQuestions = async () =>{
    const response = await axios.get('http://localhost:4000/api/questions');
    setQuestions(response.data);
  }

  const sendMessage = async (e) => {
      e.preventDefault()
      
      const sendData = {
        name: userData.name,
        email: userData.email || "not defined",
        phone: userData.phone || "not defined",
        message: userData.message 
      }

      const res = await axios.post('http://localhost:4000/api/questions/client-message', sendData);

      alert(res.data.message);
      formRef.current.reset()
  }

  useEffect(() => {
    getQuestions();
  },[]);

  const [searchParams, setSearchParams] = useSearchParams();


  console.log();
  if(searchParams.get('search') === 'Contact-us'){
    return(
      <div className="Support">
        <div className="contact">
          <div className="intro">
            <h1>Contact Our Team</h1>
          </div>
          <div className="body">
            <form onSubmit={event => sendMessage(event)} ref={formRef} >
                <div className="group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" name="name" id="name"  required onChange={(e) => setUserData((prev) => ({...prev, name: e.target.value}))} />
              </div>
              <div className="group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required onChange={(e) => setUserData((prev) => ({...prev, email: e.target.value}))} />
              </div>
              
              <div className="group">
                <label htmlFor="phone">Phone:</label>
                <input type="tel" name="phone" id="phone" onChange={(e) => setUserData((prev) => ({...prev, phone: e.target.value}))}  />
              </div>
              <div className="group">
                <label htmlFor="message">Message:</label>
                <textarea name="message" id="message" cols="30" rows="5" placeholder="Enter your message...." onChange={(e) => setUserData((prev) => ({...prev, message: e.target.value}))}></textarea>
              </div>
              <div className="group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }else if(window.location.pathname === '/support' || searchParams.get('search') === 'FAQs'){
    return (
      <div className="Support">
        <div className="faqs-page">
          <div className="intro">
            <h1>FAQs</h1>
            <p>Frequently asked questions</p>
          </div>
          <div className="body">
            {questions.questions ? questions.questions.map((question, index) => (
              <div className="question" key={index}>
                <div className="title" >
                  <h3>{question.title}</h3>
                  <i id={`arrowDown-${index}`}
                  onClick={() => 
                  {document.getElementById(`para-${index}`).style.display = "flex";
                  document.getElementById(`arrowDown-${index}`).style.display = "none";
                  document.getElementById(`arrowUp-${index}`).style.display = "flex"; } }><BsChevronDown /></i>

                  <i id={`arrowUp-${index}`} style={{display: 'none'}}
                  onClick={() => 
                  {document.getElementById(`para-${index}`).style.display = "none";
                  document.getElementById(`arrowUp-${index}`).style.display = "none";
                  document.getElementById(`arrowDown-${index}`).style.display = "flex" } }
                  ><BsChevronUp /></i>
                </div>
                <div className="answer" id={`para-${index}`}>
                  <p>
                    {JSON.parse(question.answer).ans}
                  </p>
                </div>
              </div>
            )) : <Loader />}
          </div>
        </div>
      </div>
    )
  }
}

export default Support