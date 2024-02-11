import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
import TryndMatchups from '../components/NewUpdatedMatches.json';
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
  const [items, setItems] = useState ({
    potion: {},
    lSword: {},
    dBlade: {},
    dShield: {},
    cloth: {},
  })
  const [itemImg, setItemImg] = useState({
    item1: '',
    item2: '',
    item3: ''
  });

  const [sumSpells, setSumSpells] = useState({
    ignite: '',
    ghost: '',
    flash: '',
    cleanse: ''
  })


  const { championName } = useParams();
  const version = useSelector(state => state.version);
  
  const matchingChampion = TryndMatchups.find(
    champion => champion.CHAMPION === championName
  );

  const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;

    useEffect(() => {
      const getAbilities = async () => {
        try {
          const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championName}.json`)
          const itemResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`)
          const spellResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`)
          const items =itemResponse.data.data;
          const abilities = response.data.data[championName].spells
          const passive = response.data.data[championName].passive
          const spells = spellResponse.data.data
          console.log(spells)
          setAbiliites({
            passive: passive,
            q: abilities[0],
            w: abilities[1],
            e: abilities[2],
            r: abilities[3]
          })
          setItems ({
            potion: items[2003],
            lSword: items[1036],
            dBlade: items[1055],
            dShield: items[1054],
            cloth: items[1029],
          })
          setSumSpells ({
            ignite: spells.SummonerDot,
            ghost: spells.SummonerHaste,
            flash: spells.SummonerFlash,
            cleanse: spells.SummonerBoost
          })
        } catch (error){
          console.error(error)
        }
      }
      getAbilities()
    }, [championName])

console.log(sumSpells)
    useEffect(() => {
      switch (matchingChampion['STARTING ITEM']) {
        case "1":
          setItemImg({
           item1: items.dShield.image,
           item2: items.potion.image
          })
          break
        case "2":
          setItemImg({
            item1: items.dBlade.image,
            item2: items.potion.image
           })
          break
        case "3":
          setItemImg({
            item1: items.lSword.image,
            item2: items.potion.image
           })
          break
        case "4":
          setItemImg({
            item1: items.cloth.image,
            item2: items.potion.image
           })
          break
          case "1, 3":
          setItemImg({
            item1: items.dShield.image,
            item2: items.potion.image,
            item3: items.lSword.image
           })
          break
          case "2, 3":
          setItemImg({
            item1: items.dBlade.image,
            item2: items.potion.image,
            item3: items.lSword.image
           })
          break
        default: 
          setItemImg('')
      } 
    }, [matchingChampion, items])
 
    // console.log(itemImg.item1.full)
// https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/item.json item json
// https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/1001.png item img

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
                  const capitlized = ability.toUpperCase().charAt(0)
                  const abilityData = abilities[ability];
                  if (!abilityData || !abilityData.image) {
                    // If ability data or image data is missing, skip rendering
                    return null;
                  }
                  return (
                    <div key={ability.id} className='img-hover'>
                      <h1 className='ability-letter'>{capitlized}</h1>
                      {!abilityData.id ? 
                      <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${abilityData.image.full}`} alt="" /> : null}
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
                    {itemImg.item1 && itemImg.item1.full && itemImg.item2 && itemImg.item2.full && (
                      <>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${itemImg.item1.full}`} alt="starting item" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${itemImg.item2.full}`} alt="starting item" />
                      </>
                    )}
                    {itemImg.item3 ? itemImg.item3 && itemImg.item3.full && (
                      <>
                        <h1>OR</h1>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${itemImg.item3.full}`} alt="starting item" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${itemImg.item2.full}`} alt="starting item" />
                        <p>X 3</p>
                      </>
                    ) : null}
                  </div>
                  <div className="summoner-spells">
                    <h1>Starting Spells</h1>
                    <img src="" alt="spells" />
                    <img src="" alt="spells" />
                  </div>
                </div>    
              </div>
              <h1>Strat</h1>
              <p>{matchingChampion['WHAT TO DO']}</p>
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
