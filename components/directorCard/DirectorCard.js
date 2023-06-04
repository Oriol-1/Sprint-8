import React from 'react';

// Componente DirectorCard
const DirectorCard = ({ director }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Directed by: {director}</h5>
      </div>
    </div>
  );
};

export default DirectorCard;