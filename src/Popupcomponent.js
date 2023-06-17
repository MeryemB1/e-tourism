import React, { useState } from 'react';
import Modal from 'react-modal';
import "./Popupcomponent.css";
import { FiXCircle } from "react-icons/fi";
import userimage from './assets/userimage.png';
Modal.setAppElement('#root');
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
    zIndex: 5,
    
  
  },
  content: {
   
    width: '500px',
    height: '230px',
    margin: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '15px',
  },
};


const PopupComponent = ({ isOpen, closeModal , wilaya , email}) => {
function enregistrercommentaire (){
 /* const accessToken = 'a0UL8Wtmrv1e_mdzP2i5dCqk5yrxcSzvLsBUokxeuNW2H';
    const requestOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        body: JSON.stringify({commentadded , wilaya, email}),
      },
      
    };
  
    fetch('https://fenetech-1-g8945601.deta.app/api/v1/create-comment', requestOptions)
    .then(response => response.json())
    .then(data => {
     
      console.log(data);
       closeModal();
    })
    .catch(error => {
     
      console.error(error);
    });*/
console.log(commentadded);
 //// sauvgard dans la base de donnée 

}
  const [commentadded,setcommentadded]=useState("");
  return (
    <Modal  isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2 >Commantaire</h2>
      <div className='textimage'>
      <img src={userimage} alt='userimage' id="image"/>
      <textarea id="commentairearea" placeholder="Enter your comment" rows={4} onChange={(e)=>{setcommentadded(e.target.value)}} />
     
      </div>
      <button onClick={closeModal} id="closebutton"><FiXCircle size={25} color="grey"/></button>
      <button onClick={enregistrercommentaire} id="submit">Ajouter</button>
    </Modal>
  );
};

export default PopupComponent;