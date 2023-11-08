import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import '../styling/Home.scss';
import Nav from '../components/Nav';
import styled from 'styled-components';
import ChampNames from '../components/Champions.json';

const HeroImg = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5)), url(${props => props.imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    h1{
      font-size: 60px;
    }
  }
`;

function Home() {
  const dispatch = useDispatch();
  const [skinNumber, setSkinNumber] = useState();
  const [champName, setChampName] = useState();
  const [championImg, setChampionImg] = useState('');

  useEffect(() => {
    console.log('Component rendered');
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/realms/na.json');
        const version = response.data.v;

        const championsResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
        dispatch({ type: 'SET_CHAMPIONS', payload: championsResponse.data.data });

        const champNameData = Object.values(ChampNames);
        const randomIndexName = Math.floor(Math.random() * champNameData.length);
        const randomName = champNameData[randomIndexName];
        const nameRandom = randomName.name;
        console.log(nameRandom);
        setChampName(nameRandom);

        const champResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion/${nameRandom}.json`);
        const skin = champResponse.data.data[nameRandom].skins;
        const skinsData = Object.values(skin);
        const randomIndex = Math.floor(Math.random() * skinsData.length);
        const randomSkin = skinsData[randomIndex];
        setSkinNumber(randomSkin.num);

        const imgURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nameRandom}_${randomSkin.num}.jpg`;
        setChampionImg(imgURL);
      } catch (error) {
        console.log('Error occurred:', error);
        // Handle the error here, such as showing an error message or performing any necessary cleanup
      }
    };

    fetchData();
  }, []);

  return (
    <HeroImg imageUrl={championImg}>
      <Nav />
      <div className='header'>
        <h1>
          League of Champions
        </h1>
      </div>
    </HeroImg>
  );
}

export default Home;
