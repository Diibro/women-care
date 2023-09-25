import HeroImage from "../assets/pageImages/p-3-rb.png";
import HImage1 from "../assets/pageImages/health-1.png"; 
import AccountImage from '../assets/pageImages/account-2-rb.png';

import { useNavigate } from "react-router-dom";
import { MainContext } from "./AppContect";
import { useContext } from "react";
import { NavLink} from "react-router-dom";

import { Loader } from "./components";

const Home = () => {
  const navigate = useNavigate();
  const data = useContext(MainContext);
  const navigateToResource = (id) => {
      navigate(`/resources?resource=${id}`);
  } 
  return (
    <div className="Home">
      <div className="hero-sec">
        <div className="cont">
          <p>Keep good health of your<br /> <span>Body and Baby</span> <br />during pregnancy</p>
          <img src={HeroImage} alt="pregnant Woman" />
        </div>
      </div>
      <div className="message">
        <p>Health coverage that works with your life style,<br /> helps you get the best care possible <br /> and fits within your financial picture</p>
      </div>
      <div className="resources backed">
        <h2>Get pregnancy information you can trust</h2>
        <p>Our resources help you understand more about the healthy practices best for your life.</p>
        <p>They help know the do&#39;s and donts during a whole woman&#39;s life</p>
        
    </div>
    <div className="resources">
    <div className="cont">
          <div className="col-1">
            {data.resData.map((resource, index) => {
              let no = data.resData.length - 3;

              if(index >= no){
                return(
                  <div key={index} className="card-x" >
                <img src={resource.image} alt="Resources" />
                <div className="content">
                  <h4>{resource.title}</h4>
                  <button onClick={() => navigateToResource(resource.id)}>View Resource</button>
                </div>
              </div>
                )
              }
            })}
          </div>
          <div className="col-2">
            <h4>Good life is a priority</h4>
            <img src={HImage1} alt="Side image" />
            <p>Raise healthy children</p>
          </div>
        </div>
        <div className="row">
        <button onClick={() => {navigate('/resources'); data.setSearchOn(true) }}>More Resources</button>
        </div>
    </div>
    <div className="experts">
      <h2>Talk to our experts</h2>
      <div className="cont">
        {data.specialists ? 
             data.specialists.map((expert, index) => (
              <div className="expert" key={index}>
                <NavLink><img src={expert.image} alt={expert.name} /></NavLink>
                <h4>{expert.name }</h4>
              </div>
            ))
          : <Loader />}
      </div>
    </div>
    {/* <div className="products">
      <h2>Products recommended by our specialists <NavLink to="/e-shopping">View All <MdKeyboardDoubleArrowRight /></NavLink></h2>
      <p></p>
      <div className="cont">
        {data.products ? data.products.map((product, index) => {
          if(index <= 3){
            return(
              <div className="product" key={index}>
            <img src={product.image} alt="" />
            <h4>{product.title}</h4>
            <button>View Product</button>
          </div>
            )
          }
        }) : <Loader />}
      </div>
    </div> */}
    <div className="testimonials">
      <h3>What do others say </h3>
      <p>who ever uses our platform comes back with a positive feedback !!!</p>
      <div className="cont">
        {data.testimonies ? ( data.testimonies.map((person, index) => {
          if(index <= 3){
            return(
              <div className="testimony" key={index}>
                <img src={AccountImage} alt={person.name} />
                <h5>{person.name}</h5>
                <blockquote>&#34; Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, consequuntur! Porro laborum exercitationem ratione, nam architecto nihil unde ea, dicta iste fugit quos repudiandae itaque, soluta maiores consequuntur incidunt possimus!
                Numquam.&#34; </blockquote>
              </div>
            )
          }
        } )
        ) : <Loader />}
      </div>
    </div>
    </div>
  )
};

export default Home;