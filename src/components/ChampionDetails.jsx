import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
import TryndMatchups from '../components/TryndMatchups.json';
import '../styling/Matchup.scss'

function ChampionDetails() {
  // const myUUID = uuidv4();
  const [abilities, setAbiliites] = useState({
    passive: '',
    q: '',
    w: '',
    e: '',
    r: ''
  })
  const { championName } = useParams();
  const version = useSelector(state => state.version);
  
  const matchingChampion = TryndMatchups.find(
    champion => champion.Champion === championName
  );

  const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;

    useEffect(() => {
      const getAbilities = async () => {
        try {
          const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championName}.json`)
          console.log(response)
          const abilities = response.data.data[championName].spells
          const passive = response.data.data[championName].passive
          console.log(passive)
          setAbiliites({
            passive: passive,
            q: abilities[0],
            w: abilities[1],
            e: abilities[2],
            r: abilities[3]
          })
        } catch (error){
          console.error(error)
        }
      }
      getAbilities()
    }, [championName])
console.log(abilities)
// https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/AhriE.png
  return (
    <div className='body-container'>
      {matchingChampion ? (
        <div className='matchup-container'>
          <div className='champion-header'>
            <img src={imageUrl} alt={championName} />
            <h1>{matchingChampion.Champion}</h1>
            <div className="abilities">
              {
                Object.keys(abilities).map((ability) => {
                  const abilityData = abilities[ability];
                  console.log("ability data", abilityData)
                  if (!abilityData || !abilityData.image) {
                    // If ability data or image data is missing, skip rendering
                    return null;
                  }
                  return (
                    <div key={ability.id} className='img-hover'>
                      {!abilityData.id ? <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${abilityData.image.full}`} alt="" /> : null}
                      <img key={ability.id} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${abilityData.image.full}`} alt="" />
                      <div className='hover-text' key={ability.id}>
                        <p dangerouslySetInnerHTML={{ __html: abilities[ability].description }} />
                        {abilityData.id ? 
                          <>
                            <p>Range: {abilities[ability].rangeBurn}</p>
                            <p>Cooldown: {abilities[ability].cooldownBurn}</p>
                          </>
                        : null}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className='matchup-info'>
            <div className='difficulty'>
              <p>Difficulty: {matchingChampion.DIFFICULTY}</p>
            </div>
            <div className="info-container">
              <div className="starting-items">
                <div className="items-container">
                  <div className="items">
                    <h1>Starting Items</h1>
                    <img src="" alt="starting item" />
                    <img src="" alt="starting item" />
                  </div>
                  <div className="summoner-spells">
                    <h1>Starting Spells</h1>
                    <img src="" alt="spells" />
                    <img src="" alt="spells" />
                  </div>
                </div>    
              </div>
              <h1>Strat</h1>
              <p>{matchingChampion.DO}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src={imageUrl} alt={championName} />
          <p>No data found for {championName}.</p>
        </>
       
      )}
    </div>
  );
}

export default ChampionDetails;
