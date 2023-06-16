import React, { Suspense, useState,useRef, useEffect } from "react";
import Bar from "./bar";
import Menu from "./Menu";
import "./Travelplan.css";
import {Model} from "./assets/Model";
import path from "./assets/path.png";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

function Travelplan (){
   const [clickbutton,setclickbutton]=useState(false);
   const [reponse,setreponse]=useState(false);
   const [city,setcity]=useState("");
   const [budget,setbudget]=useState("");
   const [dayrange,setdayrange]=useState("");
   const [categorieone,setcategorieone]=useState("");
   const [categorietwo,setcategorietwo]=useState("");
   function resultfunction ()
   {
    console.log (city,budget,dayrange,categorieone,categorietwo)
    setreponse(true);
   } 

   
return (
  
      
     <div className="Travelplan">
          <Bar/>
          <Menu/>
          <div className="Maindiv">
          {clickbutton === false &&  
          <div className="chatbottitle">
            <div className="maincontainer">
                <div className="divfortext">
                    <div className="titre">
                    <h1>Welcome to 
                        Algerian Journey 
                        <span style={{color : "#52FF00"}}> Chatboot</span></h1>
                    </div>
                    <p>Do you lack inspiration for your travel destinations?
                       Then give our chatbot a try.</p>
                        <button id="commencerchatboot" onClick={()=>setclickbutton(true)}> Start </button>
                </div>
                <div className="Placeforcanvas">
                <img src={path} alt="path" id="path"/>
                <div className="Canvas">
                <Canvas >
                <OrbitControls enableZoom={false}/>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-6,7,4]} intensity={1}/>
                <Suspense fallback={null}>
                   
                    <group position={[0, -1, 0]}>
                    <Model />
                    </group>
                </Suspense>
             </Canvas>
                </div>
               
                </div>
           
            </div>
           
          </div>
               }
           {clickbutton ===true && reponse===false &&
               <div className="chatbottitle">
               <div className="maincontainer">
               <img src={path} alt="path" id="path" style={{opacity: "20%" , width:"45%" , right: "18%"}}/>
               <div className="containers ">
               <div className="headtitle">
                <h1>Complete the 
               <span style={{color : "#52FF00"}}> Following...</span></h1>
                </div>
                <div className="formbody">
                <h3>Give me a good place to visit, knowing that I'm in Algeria.
             <input placeholder="City"  onChange={(e)=>setcity(e.target.value)}/>, I have a budget of
             <input placeholder="Budget"  onChange={(e)=>setbudget(e.target.value)}/> and I'll be available in the day range
               <input placeholder="Day-range"  onChange={(e)=>setdayrange(e.target.value)} /> and I love to visit
                 <select className="cat"  onChange={(e)=>setcategorieone(e.target.value)}>
                    <option>option1</option>
                    <option>option2</option>
                    <option>option3</option>
                    <option>option4</option>
                    <option>option5</option>
                 </select>
                 <select className="cat"  onChange={(e)=>setcategorietwo(e.target.value)}>
                 <option>option1</option>
                    <option>option2</option>
                    <option>option3</option>
                    <option>option4</option>
                    <option>option5</option>
                 </select>
                 </h3>

                <div/>
               
                </div>
                <button id="okaychat" onClick={()=>{resultfunction()}}>Submit</button>
                  
                
               </div>
             </div>
             </div>
           }
             { reponse===true &&  <div className="chatbottitle">
               <div className="maincontainer">
                <div className="displayresults">
                      <h1 >Result</h1>
                      <div className="scrollsection">
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                      </div>
                </div>
               
                </div>
                </div>}
         
         </div>
         </div>
 
    
)
};
export default Travelplan;