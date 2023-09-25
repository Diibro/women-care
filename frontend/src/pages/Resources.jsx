import { useContext} from "react"
import { MainContext } from "./AppContect";
import {  useNavigate,useSearchParams } from "react-router-dom";
import { Loader } from "./components";


const Resources = () => {
  const navigate = useNavigate();
  const data = useContext(MainContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  if(!window.location.search){
    return (
      <div className="Resources">
        <div className="head">
          <h1>Resources</h1>
        </div>
        <div className="exp">
          <p>Resources help you understand several healthy practices you need to follow so as to keep good health of your body and your child.  They include: healthy foods, fitness activities, health checkups, and medical equipment which you need to be aware of so to sustain a better life for you and the baby inside you womb.</p>
        </div>
        <div className="cont">
          {data.resData[0] ? 
            data.resData.map((resource, index) => (
              <div className="card-y" key={index}>
                <img src={resource.image} alt="" />
                <div className="content">
                  <h4>{resource.title}</h4>
                  <p>{resource.description}</p>
                  <button onClick={() => {setSearchParams('resource',resource.id); navigate(`/resources?resource=${resource.id}`) }} >View More</button>
                </div>
              </div>
            )
          ) : <Loader /> }
        </div>
      </div>
    )
  }else{
    return(
      <div className="resourceView">
        {data.resData.map((resource) => {
          if(resource.id === searchParams.get('resource')){
            return(
              <div className="Resource" key={resource.id}>
                <div className="content">
                  <h2>{resource.title}</h2>
                  <img src={resource.image} alt="" />
                  <p>{resource.description}</p>
                </div>
                <div className="more_title">
                  <h3>More resources you may like....</h3>
                </div>
                <div className="moreRes">
                {data.resData[0] ? 
                  data.resData.map((res, index) => {
                    if(res.id != searchParams.get('resource')){
                      return(
                        <div className="card-y small-card"  key={index}>
                          <img src={res.image} alt="" />
                          <div className="content">
                            <h4>{res.title}</h4>
                            <button onClick={() => {setSearchParams('resource',res.id); navigate(`/resources?resource=${res.id}`) }} >View Resource</button>
                          </div>
                        </div>
                      )
                    }
                  }
                ) : <Loader /> }
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }

  
}

export default Resources