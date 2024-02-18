import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Nav.scss';


function Nav({ currentPage }) {
  const isHomePage = currentPage === '/';
  const navStyle = {
    position: isHomePage ? 'absolute' : 'relative'
  };
  return (
    <div className='containerNav' style={navStyle}>
      <ul>
        <Link to="/"><li>Home</li></Link>
        <Link to="/champions"><li>Champions</li></Link>
        <Link to="/other"><li>Other</li></Link>
      </ul>
    </div>
  );
}

export default Nav;
