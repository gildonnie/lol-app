import React from 'react';
import { useParams } from 'react-router-dom';

function ChampionDetails() {
  const { championName } = useParams();

  // Use championName to fetch the specific champion data or retrieve it from the Redux store

  return (
    <div>
      <h2>Champion Details for {championName}</h2>
      {/* Display additional champion information here */}
    </div>
  );
}

export default ChampionDetails;
