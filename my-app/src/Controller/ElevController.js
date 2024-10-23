const ElevatorState = {
  IDLE: 'IDLE',
  MOVING_UP: 'MOVING_UP',
  MOVING_DOWN: 'MOVING_DOWN',
  DOORS_OPEN: 'DOORS_OPEN',
  DOORS_CLOSED: 'DOORS_CLOSED',
};

class ElevatorController {
  constructor(totalFloors) {
    this.state = ElevatorState.IDLE;
    this.currentFloor = 1;
    this.totalFloors = totalFloors;
    this.requestQueue = [];
  }

  requestFloor(floor) {
    console.log(`Floor ${floor} requested.`);
    if (floor <= 0 || floor > this.totalFloors) {
      console.log(`Invalid floor: ${floor}`);
      return;
    }

    this.requestQueue.push(floor);

    if (this.state === ElevatorState.IDLE || this.state === ElevatorState.DOORS_OPEN) {
      this.processNextRequest();
    }
  }

  processNextRequest() {
    if (this.requestQueue.length > 0) {
      const requestedFloor = this.requestQueue.shift();

      if (requestedFloor > this.currentFloor) {
        this.state = ElevatorState.MOVING_UP;
        this.moveElevator(requestedFloor, ElevatorState.MOVING_UP);
      } else if (requestedFloor < this.currentFloor) {
        this.state = ElevatorState.MOVING_DOWN;
        this.moveElevator(requestedFloor, ElevatorState.MOVING_DOWN);
      }
    } else {
      this.state = ElevatorState.IDLE;
    }
  }

  moveElevator(destination, movingState) {
    console.log(`Elevator moving from Floor ${this.currentFloor} to Floor ${destination}.`);
    const interval = setInterval(() => {
      if (this.currentFloor !== destination) {
        if (movingState === ElevatorState.MOVING_UP) {
          this.currentFloor += 1;
          console.log(`Moving up: Floor ${this.currentFloor}`);
        } else if (movingState === ElevatorState.MOVING_DOWN) {
          this.currentFloor -= 1;
          console.log(`Moving down: Floor ${this.currentFloor}`);
        }
      } else {
        clearInterval(interval);
        this.stopElevator();
      }
    }, 1000); 
  }

  stopElevator() {
    console.log(`Stopping at Floor ${this.currentFloor}`);
    this.openDoors();
  }

  openDoors() {
    console.log("Doors opening...");
    this.state = ElevatorState.DOORS_OPEN;

    setTimeout(() => {
      this.closeDoors(() => {
        this.processNextRequest();
      });
    }, 4000); 
  }

  closeDoors(callback) {
    console.log("Doors closing...");
    this.state = ElevatorState.DOORS_CLOSED;

    setTimeout(() => {
      if (callback) callback();
    }, 2000);
  }
}

export default ElevatorController;
