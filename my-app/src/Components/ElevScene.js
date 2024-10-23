import React from 'react';
import './ElevScene.css';  
import ClosedSc from '../Scenes/Moving.jpg';
    
   
  function ElevScene({ currentFloor, elevatorState }) {
    return (
      <div className="elevator-display">
        <h2>Current Floor: {currentFloor}</h2>
        <h3>Elevator State: {elevatorState}</h3>
        <div className="elevator-scene">
        {/* <img src={ClosedSc} alt="Elevator Scene" className="elevator-image" /> */}
        </div>
      </div>
    );
  }
  
  export default ElevScene;