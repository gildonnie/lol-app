import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styling/Card.scss';
import Nav from '../components/Nav'


function Data() {
  const champions = useSelector((state) => state.champions);
  const version = useSelector(state => state.version);
  
  console.log(champions)
  return (
    <>
      <Nav />
      <div className="container">
        <form>
          <input type="text" />
        </form>
        <div className="wrapper">
          {Object.keys(champions).map((championKey) => {
            const champion = champions[championKey];
            const championName = champion.id;
            const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
            return (
              <div className="card" key={championKey}>
                <h1>
                  <Link to={`/champion/${championName}`}>{championName}</Link>
                </h1>
                <img src={imageUrl} alt={championName} />
                <p>{champion.blurb}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Data;
