import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import '../styling/Home.scss';
import styled from 'styled-components';
import ChampNames from '../components/Champions.json';
import { useSelector } from 'react-redux';
import Bg from '../imgs/bg.jpg';
import Logo from '../imgs/logo4.png';
import Background from '../imgs/background1.png'
import Nav from '../components/Nav.jsx';
import pVid from '../videos/passive.mp4';
import qVid from '../videos/q.mp4';
import wVid from '../videos/w.mp4';
import eVid from '../videos/e.mp4';
import rVid from '../videos/r.mp4';

const HeroImg = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, 0.25)), url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .header {
    display: flex;
    justify-content: center;
    z-index: auto;
    img {
      width: 900px;
      margin-top: -60px;
    }
  }
`;


const Section = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, 0.25)), url(${Bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  max-height: auto;
  h1 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

function Home() {
  const dispatch = useDispatch();
  const [skinNumber, setSkinNumber] = useState();
  const [champName, setChampName] = useState();
  const [championImg, setChampionImg] = useState('');
  const [description, setDescription] = useState('');
  const [abilityVid, setAbilityVid] = useState();
  const [abilities, setAbiliites] = useState({
      passive: {},
      q: {},
      w: {},
      e: {},
      r: {}
  })
  const tryn = "Tryndamere";
  const version = useSelector(state => state.version);

  useEffect(() => {
    console.log('Component rendered');
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/realms/na.json');
        const version = response.data.v;
        dispatch({ type: 'SET_VERSION', payload: version });

        const championsResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
        dispatch({ type: 'SET_CHAMPIONS', payload: championsResponse.data.data });

        const champNameData = Object.values(ChampNames);
        const randomIndexName = Math.floor(Math.random() * champNameData.length);
        const randomName = champNameData[randomIndexName];
        const nameRandom = randomName.name;
        console.log(nameRandom);
        setChampName(nameRandom);

        const champResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion/${tryn}.json`);
        // const champResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion/${nameRandom}.json`);
        const skin = champResponse.data.data[tryn].skins;
        const skinsData = Object.values(skin);
        const randomIndex = Math.floor(Math.random() * skinsData.length);
        const randomSkin = skinsData[randomIndex];
        setSkinNumber(randomSkin.num);

        const imgURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${tryn}_${randomSkin.num}.jpg`;
        setChampionImg(imgURL);
      } catch (error) {
        console.log('Error occurred:', error);
        // Handle the error here, such as showing an error message or performing any necessary cleanup
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tryndAbility = async () => {
      try {
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/Tryndamere.json`)
        const abilities = response.data.data.Tryndamere.spells
        const passive = response.data.data.Tryndamere.passive
        console.log(abilities)
        setAbiliites({
          passive: passive,
          q: abilities[0],
          w: abilities[1],
          e: abilities[2],
          r: abilities[3]
        })
      } catch (error) {
        console.error(error)
      }
    }
    tryndAbility()
  }, [])

  console.log(abilities)

  const handleAbility = (id) => {
    setDescription(abilities[id].description)
    switch (id) {
      case 'passive':
        setAbilityVid(pVid)
        break
      case 'q':
        setAbilityVid(qVid)
        break
      case 'w':
        setAbilityVid(wVid)
        break
      case 'e':
        setAbilityVid(eVid)
        break
      case 'r':
      setAbilityVid(rVid)
      break
    }
    
  }
 
  return (
    <div className='main'>
      <HeroImg imageUrl={championImg}>
      <Nav />
        <div className='header'>
          <img className='logo' src={Logo} alt="logo" />
          {/* <h1>
            League of Tryndamere
          </h1> */}
        </div>
      </HeroImg>
      <Section>
        <div className="header-section">
          <img src={Background} alt="trynd" />
          <div className='header-text'>
            <h2 className='vertical-text'>Early Life</h2>
            <h1>Tryndamere <br/>Lore</h1>
          </div>
        </div>
        <div className='lore-p'>
          <p>Tryndamere was part of a nameless barbarian tribe known for their stamina and prowess in combat, which forged blades based on their god's tusks. They fought raiding tribes, the beasts of the mountains and Noxus Crest icon Noxian armies trying to claim territory in the Freljord. As he grew up among his tribe, Tryndamere developed into a strong warrior.

          One night, the tribe witnessed an unnatural storm from the east, where the darkin Aatrox Aatrox stood before them. Some of the barbarians bowed to him under the belief that he was their Boar God Boar God, but he slaughtered them all. Filled with rage, Tryndamere charged at Aatrox, but was swatted away. As he lay on the verge of death, he was revived by a rage he never felt before, his willpower and thirst for vengeance preventing him from dying.

          Tryndamere found his tribe's last remaining survivors, knowing they were doomed with enemies surrounding them throughout the Freljord. Hearing rumors of a tribe which worshipped the reincarnation of Avarosa, they set off to the west where they met the Freljord Avarosan Avarosan. Eager to gain respect among the tribe, he challenged the Avarosans to duels. However, they began to fear him due to his savage, furious way of fighting and how his wounds regenerated faster the more rage he held. In one duel he was so lost in his fury that he was on the verge of killing his opponent, but Braum Braum, an Iceborn allied with the Avarosan, stood in the way with his shield. Tryndamere kept attacking Braum's unbreakable shield until his rage subsided, and the two eventually became friends. Afterward, the tribe's survivors were welcomed into the Avarosan and Tryndamere was arranged to form a political marriage with the Avarosan warmother, Ashe Ashe, but the two slowly grew into a genuine relationship.</p>
        </div>
      </Section>
      <Section>
        <div className="infoContainer">
          <div>
            <div>
              <img src="" alt="" />
              <p>Role: Fighter</p>
            </div>
            <div>
              <img src="" alt="" />
              <p>Difficulty: Moderate</p>
            </div>
          </div>
          <div>
            <p>Fueled by unbridled fury and rage, Tryndamere once carved his way through the Freljord, openly challenging the greatest warriors of the north to prepare himself for even darker days ahead. The wrathful barbarian has long sought revenge for the annihilation of his clan, though more recently he has found companionship with Ashe, the Avarosan warmother, and a home with her people. His almost inhuman strength and fortitude is legendary, and has delivered him and his new allies countless victories against the greatest of odds.</p>
          </div>
        </div>
      </Section>  
      <Section>
        <div className="abilitiesContainer">
          <div className="abilityImg">
            <img src="" alt="" />
            <p className="abilityInfo"></p>
          </div>
          <div className="video">
            <iframe src="" frameborder="0"></iframe>
          </div>
        </div>
      </Section>
      <Section>
        <div className="header-section2">
          <div className='header-text2'>
            <h2 className='vertical-text2'>Into Battle</h2>
            <h1>Tryndamere <br/>Abilities</h1>
          </div>
        </div>
        <div className='trynd-abilities'>
            <div className='ability-icons'>
              <div className="abilities">
                {
                  Object.keys(abilities).map((ability) => {
                    const capitlized = ability.toUpperCase().charAt(0)
                    const abilityData = abilities[ability];
                    if (!abilityData || !abilityData.image) {
                      return null;
                    }
                    return (
                      <div key={ability.id} className='img-hover'>
                        <h1 className='ability-letter-home'>{capitlized}</h1>
                        {!abilityData.id ? 
                        <img onClick={() => handleAbility(ability)} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${abilityData.image.full}`} alt="" /> : null}
                        <img onClick={() => handleAbility(ability)} key={ability.id} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${abilityData.image.full}`} alt="" />
                      </div>
                    );
                  })
                }
              </div>
              <div className="ability-description">
                <p>{description}</p>
              </div>
            </div>
            <div className='ability-vid'>
              <video width="320" height="240" playsInline loop muted>
                <source src={abilityVid} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
        </div>
      </Section>
    </div>
  );
}

export default Home;
