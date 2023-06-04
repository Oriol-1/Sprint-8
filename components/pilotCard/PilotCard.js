/* eslint-disable @next/next/no-img-element */
import React from 'react';


const PilotCard = ({ name, image }) => {
    return (
      <div className="piloto-card">
        <div className="piloto-card-content">
          <h4>{name}</h4>
          <img src={image} alt={`${name}`} />
        </div>
      </div>
    );
  };

export default PilotCard;