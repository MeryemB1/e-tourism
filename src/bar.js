import React from "react";
import './bar.css';
import logo from "./assets/logosite.png";
import defaultpage from "./assets/default.png";
import recommendation from "./assets/recommed.png";
const Bar =()=>{
    
      return (
        <div className="Bar">
           <img  src={logo} alt="logo " id="algerialogo"/>
            <div className="buttonsection">
            <button><img src={defaultpage}/> </button>
               <button><img src={recommendation}/> </button>
            </div>
               
           
        </div>
       
      );
    
    
    
}
export default Bar;
