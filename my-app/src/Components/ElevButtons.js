import React from 'react';
import './ElevButtons.css';

function ElevButtons({ onRequestFloor }) {
  const floors = [1, 2, 3, 4, 5, 6];  
  return (
    <div className="elevator-buttons">
      {floors.map(floor => (
        <button
          key={floor}
          className="elev-button"
          onClick={() => onRequestFloor(floor)}
        >
          {floor}
        </button>
      ))}
    </div>
  );
}

export default ElevButtons;
