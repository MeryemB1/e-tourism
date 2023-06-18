import "./Mappage.css";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "./assets/mark.png";
import mark from "./assets/marker.png";
import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import userimage from './assets/userimage.png';
import Popup from './littlepopup';
import Sidebar from './sidebar';
import axios from 'axios';
import person from "./assets/comperson.png";
import PopupComponent from "./Popupcomponent";
import active from './assets/active.png';
import Map,{
  Marker,
  NavigationControl,
  useMap,
  Layer,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
import { Activity } from "lucide-react";
import { act } from "react-dom/test-utils";
import { comment } from "postcss";

function Mappage() {
  const [mapwilaya,setmapwilaya]=useState([]);
  const [passage,setpassage]=useState({});
  const [activity,setactivity]=useState([]);
  const location=useLocation();
  const [lng, setLng] = useState(1.6667);
  const [lat, setLat] = useState(28.0290);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredactivity, setIsHoveredactivity] = useState(false);
  const [selectedwilaya, setSelectedwilaya] = useState(null);
  const [showSideBar, setshowsidebar]=useState(false);
  const [clickedwilaya,setclickedwilaya]=useState(null);
  const [isready,setisready]=useState(true);
  const [userlatitude, setuserlatitude]=useState(null);
 
  const [userlongitude,setuserlongitude]=useState(null);
  const mapRef = useRef(null);
  const [useremail,setuseremail]=useState("km_karim@esi.dz");
  const [useradress,setuseradress]=useState(null);
  const [map,setmap]=useState(null);
  const [categorie,setcategorie]=useState("");
  const [type,settype]=useState("");
  const [placelenght,setplacelenght]=useState(null);
  const [activitylenght,setactivitylenght]=useState(null);
  const [selectedactivity,setselectedactivity]=useState("");
  const [globaletablen,setglobaletable]=useState([]);
  const [common,setcommen]=useState();
  const [commentairecontent,setcommentairecontent]=useState([]);
  const [click,setclick]=useState({});
  useEffect(()=>{
    const instruction=document.getElementById("instructions");
    instruction.style.display="none";
  },[]);
  useEffect(()=>{
    for( var i=0;i<mapwilaya.length;i++)
    {
        if (mapwilaya[i].name===location.state.wilaya)
        {
          setLng(mapwilaya.latitude);
          setLat(mapwilaya.longitude)
        }
    }
  },[])
  useEffect(()=>{
    fetch(`https://ffenneticcc.onrender.com/api/v1/get-place-by-wilaya/${location.state.wilaya}`)
  .then(response => response.json())
  .then(data => {
    // Process the response data
    console.log(data);
    setmapwilaya(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

  },[])

//getting activity of the wilaya 
useEffect(()=>{

  fetch(`https://ffenneticcc.onrender.com/api/v1/get-activity-by-wilaya/${location.state.wilaya}`)
  .then(response => response.json())
  .then(data => {
    // Process the response data
    console.log(data);
    setactivity(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

 },[]);

 //get comments 
 const [verif,setverif]=useState(false);
 function getcomments(id){

  fetch(`https://ffenneticcc.onrender.com/api/v1/get-place-comments/{id}?Placeid=${id}`)
  .then(response => response.json())
  .then(data => {
   
    console.log(data);
    setcommentairecontent(data);
    setverif(true);
  })
  .catch(error => {
   
    console.error(error);
  });
   
 };





    const getRoute = async() => {
     
      const start = [userlongitude,userlatitude]; 
      
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // Provide your start coordinates
      const mapboxAccessToken = 'pk.eyJ1IjoibWVyeWVtLWJhdCIsImEiOiJjbGg0bHNiZ2swMHJuM2xteXFsdnN5cWdwIn0.aGU-t7riZ-UtdRHm0rDZ4Q'; // Replace with your Mapbox access token
      
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${common.longitude || common.longi},${common.latitude ||common.latti}?steps=true&geometries=geojson&access_token=${mapboxAccessToken}`,
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

 function recherche (){
  console.log(categorie);
  console.log(type);
  //////requete pour le filtrage des types et des categorie 
  fetch(`https://ffenneticcc.onrender.com/api/v1/get-place?categorie=${categorie}&theme=${type}`)
  .then(response => response.json())
  .then(data => {
   
    console.log(data);
    if (data.length>0){
      setmapwilaya(data);
    }

  })
  .catch(error => {
   
    console.error(error);
  });
   
 
 }
 function recharger (){
  fetch(`https://ffenneticcc.onrender.com/api/v1/get-place-by-wilaya/${location.state.wilaya}`)
  .then(response => response.json())
  .then(data => {
    // Process the response data
    console.log(data);
    setmapwilaya(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

 }

  return (
    <div className="Mappage">
     {showSideBar && clickedwilaya !== null && <Sidebar obj={{clickedwilaya , useradress}}/>}
    
     <button id="commenter"  onClick={openModal}>Comment</button>
     <PopupComponent isOpen={isOpen} closeModal={closeModal} wilaya={location.state.wilaya} email={useremail} />
     
     <div className="Usersection"> 
   <img src={userimage} alt="userimage" id="userimage"/>
     <h4> Karim</h4>
     </div>
     <div className="filtrage"> 
     <button  id="recherche" onClick={()=>{recherche();}}> submit</button>
     <button id="recherche" onClick={()=>{recharger()}}>clear</button>
      <select className="categorie" onChange={(e)=>{setcategorie(e.target.value)
     }}>
        <option>monuments</option>
        <option>musées</option>
        <option>places</option>
        <option>mosqué</option>
        <option>centre commercial</option>
      </select>

      <select className="type" onChange={(e)=>{settype(e.target.value);
     }}>
        <option>HISTORIQUE</option>
        <option>religion</option>
        <option>mer</option>
        <option>Shopping</option>
      </select>
     
     </div>
     <div id="instructions"></div>
      
     <div className="commentsection">
     
          
      {commentairecontent && Array.isArray(commentairecontent)  &&
       commentairecontent.map((commentairecontent)=>(
         <div className="comment" id="comment">
       
         <div className="personinfo">
           <div className="imagecontainer">
           <img src={person} alt="person" id="person"/>
           </div> 
           <div className="name">
              <h3>{commentairecontent.emailUser}</h3>
              <p>Date : 30/11/2020</p>
        </div>

        </div>
        <div className="commentcontent">
          <h4>Comment</h4>
          <p>{commentairecontent.description}</p>
        </div>
        
      </div>
      ))}
        
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
            latitude={wilaya.latitude}
            longitude={wilaya.longitude}
          >
            <button id="invisible"
              className="marker-btn"
              onMouseEnter={() => {setIsHovered(true);
              setSelectedwilaya(wilaya)
            setcommen(wilaya) }}
              onMouseLeave={() => {setIsHovered(false);
                
              }}
              onClick={()=>{console.log(selectedwilaya);
              setshowsidebar(true);
              setclick(wilaya);
            setclickedwilaya(wilaya);
            getcomments(wilaya.id);
            setvisibleinstruction();
          getRoute()}}
            >
                 <img src={mark} width={15} height={20}/>
            </button>
            {isHovered && selectedwilaya !== null && wilaya.id===selectedwilaya.id && <Popup text={selectedwilaya.place_name}/>}
            
          </Marker>
        ))}

         {activity.map(activity => (
          <Marker
            key={activity.id}
            latitude={activity.latti}
            longitude={activity.longi}
          >
            <button id="invisible"
             className="marker-btn"
             onMouseEnter={() => {setIsHoveredactivity(true);
             setselectedactivity(activity);
            setcommen(activity) }}
             onMouseLeave={() => {setIsHoveredactivity(false);
               
             }}
             onClick={()=>{console.log(selectedactivity);
              setshowsidebar(true);
            setclickedwilaya(activity);
            setvisibleinstruction();
             getRoute()}
        }
            >
                 <img src={active} width={20} height={20} />
            </button>
            {isHoveredactivity && selectedactivity !== null && activity.id===selectedactivity.id && <Popup text={selectedactivity.description}/>}
            
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