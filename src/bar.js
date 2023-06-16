import React from "react";
import './bar.css';
import logo from "./assets/logosite.png";
import defaultpage from "./assets/default.png";
import recommendation from "./assets/recommed.png";
import { useNavigate } from "react-router-dom";

const Bar =()=>{
   
      const navigate = useNavigate();
  
    const clickmap = () => {
      navigate('/');
    };
    const clickrecommend = () => {
      navigate('/travelplan');
    };

      return (
        <div className="Bar">
           <img  src={logo} alt="logo " id="algerialogo"/>
            <div className="buttonsection">
            <button><img src={defaultpage} onClick={()=>{clickmap()}}/> </button>
               <button><img src={recommendation} onClick={()=>{clickrecommend()}}/> </button>
            </div>
               
           
        </div>
       
      );
    
    
    
}
export default Bar;
