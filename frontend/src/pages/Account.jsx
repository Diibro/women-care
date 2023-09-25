
import { useRef, useState } from "react";
import { useNavigate, useSearchParams} from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    console.log(user);
    
    try {
      const res = await axios.post('http://localhost:4000/api/login/get-in', user);

    
      if(res.data.pass){
        alert(res.data.message);
        if(res.data.type === 'Patient'){
          navigate('/dashboard/user');
        }else if(res.data.type === "Doctor"){
          navigate('/dashboard/doctor');
        }
        
      }else{
        alert(res.data.message);
      }
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          alert("Please check you email or password");
        }else{
          alert("An error occured while logging in");
        }
      }else{
        alert("Error while logging in");
      }

    }
  }
  return(
    <div className="login container">
      <form onSubmit = {event => login(event)}>
        <div className="group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))} />
        </div>
        <div className="group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}/>
        </div>
        <div className="group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const passRef = useRef();
  const [correct, setCorrect] = useState(false);

  const passCheck = (e) => {
    if(e.target.value === ""){
      passRef.current.style.border = 'none';
    }else if (e.target.value === userData.password){
      passRef.current.style.border = '2px solid green';
      setCorrect(true)
    }
    else if(e.target.value !== userData.pass ){
      passRef.current.style.border = "1.5px solid red";
      setCorrect(false);
    }
  }
 
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if(correct){
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('type', userData.accountType);
      formData.append('logo', userData.logo);

      if(userData.accountType === 'Doctor'){
        const res = await axios.post('http://localhost:4000/api/doctors/add-doctor', formData);
        alert(res.data.message);
        navigate('/')
      }else{
        const res = await axios.post('http://localhost:4000/api/patients/add-patient',formData);
        alert(res.data.message);
        navigate('/');
      }
    }else{
      alert("please check your passwords and try again");
    }

  }


  return(
    <div className="sign-up container">
      <form onSubmit={event => submitForm(event)}>
        <div className="group">
          <label htmlFor="name">Full Name:</label>
          <input type="text" name="name" id="name"  required onChange={(e) => setUserData((prev) => ({...prev, name: e.target.value}))} />
        </div>
        <div className="group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required onChange={(e) => setUserData((prev) => ({...prev, email: e.target.value}))} />
        </div>
        <div className="group">
          <label htmlFor="account-type">Account Type:</label>
          <select name="account-type" id="account-type" defaultValue="Select...."  required onChange={(e) => setUserData((prev) => ({...prev, accountType: e.target.value}))}>
            <option disabled selected>Select....</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
          </select>
        </div>

        <div className="group">
          <label htmlFor="password">Create Password:</label>
          <input type="password" name="password" id="password" onChange={(e) => setUserData((prev) => ({...prev, password: e.target.value}))} required />
        </div>
        <div className="group">
          <label htmlFor="confirm-pass">Confirmation Password:</label>
          <input type="password" name="confirm-pass" id="confirm-pass" onChange={(e) => passCheck(e)} ref={passRef} />
        </div>
        <div className="group">
          <label htmlFor="logo">Your picture (used as your logo ):</label>
          <input type="file" name="logo" id="logo" onChange={(e) => setUserData((prev) => ({...prev, logo: e.target.files[0]}))}   />
        </div>
        <div className="group">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  )
}

const Account = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState("sign-up")
  if(searchParams.get('search') === "login"){
    return (
      <div className="AccountPage" >
            <div className="cont">
              <div className="row">
                <span
                  className={active === "sign-up" && searchParams.get('search') !== "login" ? "activeAcc" : ""}
                 onClick={() => {setActive("sign-up") ;  navigate('/account-page?search=sign-up');}}>sign up</span>
                <span
                  className={active === "login" || searchParams.get('search') === "login" ? "activeAcc" : ""}
                 onClick={() => { setActive("login") ; navigate('/account-page?search=login')}}>login</span>
              </div>
              <Login />
              
            </div>
            <div className="space"></div>
      </div>
    )
  }else {
    return (
      <div className="AccountPage" >
            <div className="cont">
              <div className="row">
                <span 
                className={active === "sign-up" && searchParams.get('search') !== "login" ? "activeAcc" : ""}
                onClick={() => {setActive("sign-up") ; setSearchParams('search', 'sign-up'); navigate('/account-page?search=sign-up')}}>sign up</span>
                <span 
                className={active === "login" || searchParams.get('search') === "login" ? "activeAcc" : ""}
                onClick={() => {setActive("login") ; setSearchParams('search', 'login'); navigate('/account-page?search=login')}}>login</span>
              </div>
              <SignUp />
            </div>
      </div>
    )
  }
  
}

export default Account
