import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-text'>
       <strong>Director:</strong> {movie.director}
      <br />
      <strong>Episode:</strong> {movie.episode_id}
      <br />
     
     
    </div>
  );
};

export default MovieCard;
