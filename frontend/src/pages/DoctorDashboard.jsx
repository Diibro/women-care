import { Routes, Route, NavLink } from 'react-router-dom';
import AccountImage from '../assets/pageImages/account-2-rb.png';
import {ImHome} from 'react-icons/im';
import {AiTwotoneSetting, AiOutlineLogout, AiOutlineQuestionCircle, AiFillWechat} from 'react-icons/ai'
import {useState, useEffect, useRef} from 'react';
import axios from 'axios'

const Nav = () => {

     return(
          <div className="Nav">
               <div className="logo">
                    <img src={AccountImage} alt="Account image" />
               </div>
               <div className="nav">
                    <NavLink to=""><ImHome /></NavLink>
                    <NavLink to="manage-services">< AiFillWechat /></NavLink>
                    <NavLink to="questions"><  AiOutlineQuestionCircle/></NavLink>
                    <NavLink to="support"><AiTwotoneSetting/></NavLink>
                    <NavLink><AiOutlineLogout /></NavLink>
               </div>
          </div>
     )
}

const Home = () => {
     return(
          <div className="doctor-home">
               <div className="intro">
                    <h1>Welcome to Doctor Dashboard</h1>
                    <p>Here you can chat with your patients, post a service or resource</p>
               </div>
               <div className="cont">
                    <div className="container">
                         <NavLink to='questions'><AiOutlineQuestionCircle  /></NavLink>
                         <p>User questions</p>
                    </div>
                    <div className="container">
                         <NavLink to="manage-services"><AiFillWechat /></NavLink>
                         <p>Talk to patients</p>
                    </div>
                    <div className="container">
                         <NavLink to="support"><AiTwotoneSetting /></NavLink>
                         <p>Contact Support</p>
                    </div>
               </div>
          </div>
     )
}

const UserQuestions = () => {
     const [question, setQuestion] = useState("");
     const [update, setUpdate] = useState({});
     const [questions, setQuestions] = useState([]);
     const inputRef = useRef();

     const getQuestions  = async () => {
          const res = await axios.get('http://localhost:4000/api/questions/unanswered');
          setQuestions((res.data.questions));

     }
     const sendAnswer = async (e) => {
          e.preventDefault();
          if(!question || question === ""){
               return 
          }
          const sendData = {
               title: question,
               intent: update.intent,
               answer: update.answer
          }
          
          const response = await axios.post("http://localhost:4000/api/questions/answer-question", sendData);

          alert(response.data.message);
          inputRef.current.value = "";
          setQuestion("");
          setUpdate({});
          getQuestions();
          window.location.reload();
          // await axios.post("http://localhost:4000/api/questions/train-bot");
     } 

     const deleteQuestion =  async (questionDel) =>{
          const deleteData = {
               title: questionDel
          }

          if(deleteData.title !== "" || deleteData.title.trim() !== ""){
               const res = await axios.post("http://localhost:4000/api/questions/delete-question", deleteData);
               alert(res.data.message);
               window.location.reload();
          }
     }

     useEffect(() => {
          getQuestions();
     }, []);

     return(
          <div className="admin-chat">
               <div className="intro">
                    <h1>Here are the questions asked by Our users</h1>
               </div>
               <div className="body">
                    <div className="col">
                         {!questions[0] ? <h3>No unanswered questions </h3> : questions.map((que, index) => (
                              <div className="question" key={index}>
                                   <h3>{que.title}</h3>
                                   <div className='buttons'>
                                        <button onClick={() => {  setQuestion(que.title); !inputRef ?  inputRef.current.value === "" : console.log("mine") }}>Answer</button>
                                        <button onClick={() => {  deleteQuestion(que.title)}} >Delete</button>
                                   </div>
                                   
                              </div>
                         ))}
                    </div>
                    <div className="col">
                         {question === "" ? <i>No question selected to answer</i> : (
                              <div className='questionView'>
                                   <h3>Answering question: <i>{question}</i></h3>
                                   <form onSubmit={(event) => sendAnswer(event)}>
                                        <input type="text" placeholder='Enter the topic' onChange={(e) => setUpdate((prev) => ({...prev, intent: e.target.value}))} />
                                        <textarea name="answer" ref={inputRef} id="answer" cols="30" rows="10" onChange={(e) => setUpdate((prev) => ({...prev, answer: e.target.value})) } placeholder='Type the answer here' required></textarea>
                                        <button>Send Answer</button>
                                   </form>
                              </div>
                         ) }
                    </div>
               </div>
          </div>
     )
}


const  LiveChat = () => {
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
                    <h1>Talk to patients</h1>
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

const Support = () => {
     return(
          <div className="admin-home support">
               <div className="intro">
                    <h1>Get Support</h1>
               </div>
               <div className="cont">
                    
               </div>
          </div>
     )
}

const DoctorDashboard = () => {
  return (
    <div className='DoctorMain'>
     <Nav />
     <div className="body">
          <Routes>
               <Route path='' element={<Home />} />
               <Route path='manage-services' element={<LiveChat />} />
               <Route path='questions' element={<UserQuestions />} />
               <Route path='/support' element={<Support />} />
          </Routes>
     </div>
    </div>
  )
}

export default DoctorDashboard;