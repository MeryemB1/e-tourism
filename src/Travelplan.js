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
                    <h1>Bienvenue a 
                        Algerian Journey 
                        <span style={{color : "#52FF00"}}> Chatboot</span></h1>
                    </div>
                    <p>vous n’avez pas une idée sur vos destination ?
                         alors essayer notre chatbot</p>
                        <button id="commencerchatboot" onClick={()=>setclickbutton(true)}> Commencer </button>
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
           {clickbutton ===true &&
               <div className="chatbottitle">
               <div className="maincontainer">
                 
                <h1>nothing</h1>
               </div>
             </div>

           }
         
       </div>
       </div>
)
};
export default Travelplan;