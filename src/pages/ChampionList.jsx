import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { motion } from 'framer-motion';
import '../styling/Card.scss';
// import Nav from '../components/Nav';

function Data() {
  const champions = useSelector((state) => state.champions);
  const version = useSelector(state => state.version);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    ScrollReveal().reveal('#bottom-anime', {
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      // delay: 200,
      easing: 'ease-in-out',
    });
  }, [])

  const filteredChampions = Object.values(champions).filter(champion =>
    champion.id.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className='container'>
      {/* <Nav /> */}
      <form>
          <input 
            className='search-input'
            type="search" 
            placeholder="Search champions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      <div className="card-container">
      
        <div className="wrapper">
          {filteredChampions.map((champion, index) => {
            const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`;
            return (
              <div className="card" key={index} id='bottom-anime'>
                <h1>
                  <Link to={`/${champion.id}`}>{champion.id}</Link>
                </h1>
                <img src={imageUrl} alt={champion.id} />
                <p>{champion.blurb}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Data;
