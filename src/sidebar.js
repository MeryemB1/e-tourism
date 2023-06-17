import React, { useEffect, useState } from 'react';
import logo from "./assets/logosite.png";
import photo from "./assets/photo.png";
import home from "./assets/homeicon.png";
import loc from "./assets/markerdiv.png";
import selector from "./assets/selector.png";
import './Mappage.css';
const Sidebar = ({obj}) => {
  const [adress, setadress]=useState(obj.useradress.substring(0, 23) + '...');
  const [destination,setdestination]=useState(null);
  useEffect(()=>{
   
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${obj.clickedwilaya.latitude || obj.clickedwilaya.latti}&lon=${obj.clickedwilaya.longitude || obj.clickedwilaya.longi}&apiKey=7427512d37674feaa51c62a9983360a5`,
         { method: 'GET' }
        
      ).then(response => response.json())
      .then(result => setdestination(result.features[0].properties.formatted.substring(0, 23) + '...'))
     
      .catch(error => console.log('error', error));
    
   
    
  },[obj])
  
  
  return <div className="sidebar">
    <div className='image'>
    <img src={logo} alt="logo" id="logoside"/>
    </div>
    <div className='container'>
    <div className='titletext'>
    <h3> {obj.clickedwilaya.place_name || obj.clickedwilaya.description.substring(0,14)+'..'} </h3>
    </div>
    
    </div>
    <img src={obj.clickedwilaya.IMAGE ||obj.clickedwilaya.image } alt="photo" id="photo"/>
    <div className='Description'>
        <h4>Description</h4>
        <p>{obj.clickedwilaya.debutDate
 + "/"+ obj.clickedwilaya.finDate
 || " " }
        </p>
      <p>{obj.clickedwilaya.description}</p>
<h4>Openning</h4>
<p>{obj.clickedwilaya.acces || obj.clickedwilaya.accestime }</p>
<h4>Transport</h4>
<p>{obj.clickedwilaya.transports || "  " }</p>
<div className="whole">
   
<div className='selec'>
    <img src={selector} id="selector"/>
   </div>

<div className='transportdiv'>
<div className='location'>
     <div className='plocationdiv'>
     <p id="padress">{adress}</p>
      </div> 
      <img src={home} id="home"/>
    </div>
    <div className='destination'>
      <div className='plocationdiv'>
      <p>{destination}
      </p>
      </div>
    <img src={loc} id="home"/>
    </div>

</div>
</div>

    </div>
    </div>;
};

export default Sidebar;