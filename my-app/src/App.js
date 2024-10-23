  import React, { useState, useEffect } from 'react';
  import './App.css';
  import ElevButtons from './Components/ElevButtons';
  import ElevScene from './Components/ElevScene';
  import ElevatorController from './Controller/ElevController';  



  function App() {
    const totalFloors = 6;  
    const [currentMessage, setCurrentMessage] = useState('IDLE');
    const [elevatorController] = useState(new ElevatorController(totalFloors)); 
    const [currentFloor, setCurrentFloor] = useState(0);
    const [elevatorState, setElevatorState] = useState(elevatorController.state);

    
    
  
    
    useEffect(() => {
      const stateMessages = {
        IDLE: 'Elevator is on idle',
        DOORS_CLOSED: 'Doors are closing...',
        MOVING_UP: 'Elevator is moving up...',
        MOVING_DOWN: 'Elevator is moving down...',
        DOORS_OPEN: 'Doors are opening... <br />Please Exit or Enter the Elevator',
      };
  
      const handleState = () => {
        const state = elevatorController.state;
        if (stateMessages[state]) {
          setCurrentMessage(stateMessages[state]);
        } else {
          setCurrentMessage("Unknown state");
        }
      };

      const interval = setInterval(() => {
        setCurrentFloor(elevatorController.currentFloor);
        setElevatorState(elevatorController.state);
        handleState();
      
      }, 1000);
      return () => clearInterval(interval);  
    }, [elevatorController]);

    const handleRequestFloor = (floor) => {
      elevatorController.requestFloor(floor);
    };

    return (
      <div className="App">
        <div className="container">
          <div className="elevator-scene">
          <p dangerouslySetInnerHTML={{ __html: currentMessage }}></p>
            <ElevScene currentFloor={currentFloor} elevatorState={elevatorState} />
          </div>
          <div className="elevator-controls">
            <ElevButtons onRequestFloor={handleRequestFloor} />
          </div>
        </div>
      </div>
    );
  }

  export default App;
