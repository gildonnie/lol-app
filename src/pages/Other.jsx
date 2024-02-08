import React from 'react'
import TryndMatchups from '../components/TryndMatchups.json';

function Other() {


  return (
    <div>
      {
        TryndMatchups.map(champion => {
          const champ = champion.Champion;
          const difficulty = champion.DIFFICULTY;
          const info = champion.DO;
          return (
            <h1>{champ}</h1>
          )
        })
      }
    </div>
  )
}

export default Other;