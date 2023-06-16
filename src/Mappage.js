import "./Mappage.css";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "./assets/mark.png";
import mark from "./assets/marker.png";
import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import userimage from './assets/userimage.png';
import mapwilaya from './wilayas.json';
import Popup from './littlepopup';
import Sidebar from './sidebar';
import axios from 'axios';
import person from "./assets/comperson.png";
import PopupComponent from "./Popupcomponent";
import Map,{
  Marker,
  NavigationControl,
  useMap,
  Layer,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
function Mappage() {
  const location=useLocation();
  const [lng, setLng] = useState(1.6667);
  const [lat, setLat] = useState(28.0290);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedwilaya, setSelectedwilaya] = useState(null);
  const [showSideBar, setshowsidebar]=useState(false);
  const [clickedwilaya,setclickedwilaya]=useState(null);
  const [isready,setisready]=useState(true);
  const [userlatitude, setuserlatitude]=useState(null);
  const [userlongitude,setuserlongitude]=useState(null);
  const mapRef = useRef(null);
  const mylocation = useRef(null);
  const [geo,setgeo]=useState(null);
  const [mapSource, setMapSource] = useState(null);
  const [useradress,setuseradress]=useState(null);
  const [map,setmap]=useState(null);

 
  useEffect(()=>{
    const instruction=document.getElementById("instructions");
    instruction.style.display="none";
  },[]);

    const getRoute = async() => {
      const end = [selectedwilaya.latitude,selectedwilaya.longitude];
      const start = [userlongitude,userlatitude]; 
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // Provide your start coordinates
      const mapboxAccessToken = 'pk.eyJ1IjoibWVyeWVtLWJhdCIsImEiOiJjbGg0bHNiZ2swMHJuM2xteXFsdnN5cWdwIn0.aGU-t7riZ-UtdRHm0rDZ4Q'; // Replace with your Mapbox access token
      
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxAccessToken}`,
        { method: 'GET' }
      );
      const json = await response.json();
      const data = json.routes[0];
      console.log (json);
      const route = data.geometry.coordinates;
      
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
     
     if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#52FF00',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
     ///instuctions part 
      const instructions = document.getElementById("instructions");
      const steps = data.legs[0].steps;

       let tripInstructions = '';
for (const step of steps) {
  tripInstructions += `<li>${step.maneuver.instruction}</li>`;
 

}

instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
  data.duration / 60
)} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;

 }; 


    const handleMapLoad = (map) => {
      setmap(map.target);
      //console.log(map.target);
    //  getRoute(map.target);
      
    };
    
    


    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
             console.log ("you selected wilaya ", location.state.wilaya);
            setuserlatitude(latitude);
            setuserlongitude(longitude);
            const response = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=7427512d37674feaa51c62a9983360a5`,
               { method: 'GET' }
              
            ).then(response => response.json())
            .then(result => setuseradress(result.features[0].properties.formatted))
            .catch(error => console.log('error', error));
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, []);
   
 const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

 function setvisibleinstruction(){
  const instru=document.getElementById("instructions");
  instru.style.display="block";
 }



  return (
    <div className="Mappage">
     {showSideBar && clickedwilaya !== null && <Sidebar obj={{clickedwilaya , useradress}}/>}
    
     <button id="commenter"  onClick={openModal}>Commenter</button>
     <PopupComponent isOpen={isOpen} closeModal={closeModal} />
     
     <div className="Usersection"> 
   <img src={userimage} alt="userimage" id="userimage"/>
     <h4> Username</h4>
     </div>
     <div className="filtrage"> 
     <p>Filtrage</p>
      <select className="categorie">
        <option>categorie1</option>
        <option>categorie2</option>
        <option>categorie3</option>
        <option>categorie4</option>
      </select>

      <select className="type">
        <option>type1</option>
        <option>type2</option>
        <option>type3</option>
        <option>type4</option>
      </select>
     
     </div>
     <div id="instructions"></div>
      
     <div className="commentsection">
      <div className="comment">
       
        <div className="personinfo">
          <div className="imagecontainer">
          <img src={person} alt="person" id="person"/>
          </div>
          
      
        <div className="name">
              <h3>Cooper Aminoff</h3>
              <p>Date : 30/11/2020</p>
        </div>

        </div>
        <div className="commentcontent">
          <h4>Comment</h4>
          <p>I have just visited this place , and i was amazed about how 
much it’s beatiful and how much people are welcoming and 
kind , really recommend it !</p>
        </div>
        
      </div>
      <div className="comment">
       
       <div className="personinfo">

         <div className="imagecontainer">
         <img src={person} alt="person" id="person"/>
         </div>
     
       <div className="name">
             <h3>Cooper Aminoff</h3>
             <p>Date : 30/11/2020</p>
       </div>

       </div>
       <div className="commentcontent">
         <h4>Comment</h4>
         <p>I have just visited this place , and i was amazed about how 
much it’s beatiful and how much people are welcoming and 
kind , really recommend it !</p>
       </div>
       
     </div>
     <div className="comment">
       
       <div className="personinfo">

         <div className="imagecontainer">
         <img src={person} alt="person" id="person"/>
         </div>
     
       <div className="name">
             <h3>Cooper Aminoff</h3>
             <p>Date : 30/11/2020</p>
       </div>

       </div>
       <div className="commentcontent">
         <h4>Comment</h4>
         <p>I have just visited this place , and i was amazed about how 
much it’s beatiful and how much people are welcoming and 
kind , really recommend it !</p>
       </div>
       
     </div>
     <div className="comment">
       
       <div className="personinfo">

         <div className="imagecontainer">
         <img src={person} alt="person" id="person"/>
         </div>
     
       <div className="name">
             <h3>Cooper Aminoff</h3>
             <p>Date : 30/11/2020</p>
       </div>

       </div>
       <div className="commentcontent">
         <h4>Comment</h4>
         <p>I have just visited this place , and i was amazed about how 
much it’s beatiful and how much people are welcoming and 
kind , really recommend it !</p>
       </div>
       
     </div>
     </div>
      <Map
        mapboxAccessToken="pk.eyJ1IjoibWVyeWVtLWJhdCIsImEiOiJjbGg0bHNiZ2swMHJuM2xteXFsdnN5cWdwIn0.aGU-t7riZ-UtdRHm0rDZ4Q"
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "0px",
          
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 5,
          pitch:50,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        ref={mapRef} onLoad={handleMapLoad}
      >
        {mapwilaya.map(wilaya => (
          <Marker
            key={wilaya.id}
            latitude={wilaya.longitude}
            longitude={wilaya.latitude}
          >
            <button id="invisible"
              className="marker-btn"
              onMouseEnter={() => {setIsHovered(true);
              setSelectedwilaya(wilaya) }}
              onMouseLeave={() => {setIsHovered(false);
                
              }}
              onClick={()=>{console.log(selectedwilaya);
              setshowsidebar(true);
            setclickedwilaya(wilaya);
            setvisibleinstruction();
          getRoute()}}
            >
                 <img src={mark} width={15} height={20}/>
            </button>
            {isHovered && selectedwilaya !== null && wilaya.id===selectedwilaya.id && <Popup text={selectedwilaya.name}/>}
          
          </Marker>
        ))}
          
         
        
          {showSideBar === false && clickedwilaya === null && <div className="nosidebar"> cliquez sur un lieu </div>}

        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl  />
       
      </Map>
    </div>
      );
    }
    
    export default Mappage;