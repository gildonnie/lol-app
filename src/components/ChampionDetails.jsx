import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ScrollReveal from 'scrollreveal';
import { motion } from 'framer-motion';
import TryndMatchups from '../components/NewUpdatedMatches.json';
import ScollTop from './ScollTop'
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
    item1: {},
    item2: {},
    item3: {},
    item4: ''
  });

  const [sumSpells, setSumSpells] = useState({
    ignite: {},
    ghost: {},
    flash: {},
    cleanse: {}
  })

  const [sumImg, setSumImg] = useState({
    sum1: {},
    sum2: {},
    sum3: {}
  })

  const { championName } = useParams();
  const version = useSelector(state => state.version);
  
  const matchingChampion = TryndMatchups.find(
    champion => champion.CHAMPION === championName
  );

  console.log(championName)

  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
  const tryndImg = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Tryndamere.png`;

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
          console.log(response.data.data)
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
            item2: items.potion.image,
            item4: 'X3'
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
            item3: items.lSword.image,
            item4: 'X3'
           })
          break
          case "2, 3":
          setItemImg({
            item1: items.dBlade.image,
            item2: items.potion.image,
            item3: items.lSword.image,
            item4: 'X3'
           })
          break
        default: 
          setItemImg('')
      } 
    }, [matchingChampion, items])
 
    useEffect(() => {
      switch (matchingChampion['SUMMONERS']) {
        case "5":
          setSumImg({
           sum1: sumSpells.ignite.image,
           sum2: sumSpells.ghost.image
          })
          break
        case "6":
          setSumImg({
            sum1: sumSpells.ghost.image,
            sum2: sumSpells.flash.image
           })
          break
          case "7":
          setSumImg({
            sum1: sumSpells.ignite.image,
            sum2: sumSpells.flash.image
           })
          break
          case "8":
          setSumImg({
            sum1: sumSpells.cleanse.image,
            sum2: sumSpells.flash.image
           })
          break
          case "6, 7":
            setSumImg({
              sum1: sumSpells.flash.image,
              sum2: sumSpells.ghost.image,
              sum3: sumSpells.ignite.image
             })
            break
            case "5, 6":
              setSumImg({
                sum1: sumSpells.ghost.image,
                sum2: sumSpells.flash.image,
                sum3: sumSpells.ignite.image
               })
              break
              case "6, 8":
                setSumImg({
                  sum1: sumSpells.flash.image,
                  sum2: sumSpells.ghost.image,
                  sum3: sumSpells.cleanse.image
                 })
                break
        default: 
        setSumImg('')
      } 
    }, [matchingChampion, sumSpells])
    // console.log(sumImg.sum1.full)
// https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/item.json item json
// https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/1001.png item img
// https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/SummonerFlash.png


useEffect(() => {
  ScrollReveal().reveal('#bottom-anime', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 500,
    easing: 'ease-in-out',
  });
  }, [])

  return (
    <div className='body-container'>
      <ScollTop />
      {matchingChampion ? (
        <div className='matchup-container' id='bottom-anime'>
          <div className='champion-header'>
            <div className="vs">
              <img className='champ' src={tryndImg} alt="trynd" />
              <h1>VS</h1>
              <img className='champ' src={imageUrl} alt={championName} />
            </div>
            <h1>{matchingChampion.Champion}</h1>
            <div className="abilities">
              {
                Object.keys(abilities).map((ability) => {
                  const capitlized = ability.toUpperCase().charAt(0)
                  const abilityData = abilities[ability];
                  if (!abilityData || !abilityData.image) {
                    return null;
                  }
                  return (
                    <motion.div key={ability.id} className='img-hover' whileHover={{ scale: 1.1 }}>
                      <h1 className='ability-letter'>{capitlized}</h1>
                      {!abilityData.id ? 
                      <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${abilityData.image.full}`} alt="" /> : null}
                      <img key={ability.id} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${abilityData.image.full}`} alt="" />
                      <div className='hover-text' key={ability.id}>
                        <p dangerouslySetInnerHTML={{ __html: abilities[ability].description }} />
                        {abilityData.id ? 
                          <div className='hover-info'>
                            <hr />
                            <p>Range: {abilities[ability].rangeBurn}</p>
                            <p>Cooldown: {abilities[ability].cooldownBurn}</p>
                          </div>
                        : null}
                      </div>
                    </motion.div>
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
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemImg.item1.full}`} alt="starting item" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemImg.item2.full}`} alt="starting item" />
                        {itemImg.item4 && !itemImg.item3 ? (
                          <p className='x3'>{itemImg.item4}</p>
                        ) : null}
                      </>
                    )}
                    {itemImg.item3 ? itemImg.item3 && itemImg.item3.full && (
                      <>
                        <h1 className='or'>OR</h1>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemImg.item3.full}`} alt="starting item" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemImg.item2.full}`} alt="starting item" />
                        {itemImg.item4 ? (
                          <p className='x3'>{itemImg.item4}</p>
                        ) : null}
                      </>
                    ) : sumImg.sum3 ? 
                      <div className='invisible'>
                        <p></p>
                        <div className='img'></div>
                        <div className='img'></div>
                      </div> : null} 
                  </div>
                  <div className="summoner-spells">
                    <h1>Starting Spells</h1>
                    {sumImg.sum1 && sumImg.sum1.full && sumImg.sum2 && sumImg.sum2.full && (
                      <>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${sumImg.sum1.full}`} alt="spells" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${sumImg.sum2.full}`} alt="spells" />
                      </>
                    )}
                    {sumImg.sum3 ? sumImg.sum3 && sumImg.sum3.full && (
                      <>
                        <h1 className='or'>OR</h1>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${sumImg.sum1.full}`} alt="spells" />
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${sumImg.sum3.full}`} alt="spells" />
                      </>
                    ) : null}
                  </div>
                </div>    
              </div>
              <div className="start-header">
                <h1>Strat</h1>
                <p>Updated: {matchingChampion["LAST UPDATED"] ? matchingChampion["LAST UPDATED"] : "Not Updated Yet"}</p>
              </div>
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
