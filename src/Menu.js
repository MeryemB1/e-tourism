import React from "react";
import './Menu.css';
import user from "./assets/userimage.png";
import {BsFillSearchHeartFill} from "react-icons/bs";
const Menu =()=>{
    
      return (
        <div className="Menu">
            <h2>Map</h2>
            <input placeholder=" Serach here ...."/>
            <img src={user} id="user"/>
            </div>
       
      );
   
}
export default Menu;
