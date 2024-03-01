import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import '../styling/Nav.scss';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(window.innerWidth <= 768);

  useEffect(() => {
    ScrollReveal().reveal('#para-anime');
    
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowMenuIcon(true);
      } else {
        setShowMenuIcon(false);
        setMenuOpen(false); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='containerNav' id='para-anime'>
      <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

      {showMenuIcon && (
        <div className={`menuIcon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      )}
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        {menuOpen ? <div className="closeButton" onClick={toggleMenu}>X</div> : null}
        <Link to="/" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
        <Link to="/champions" onClick={() => setMenuOpen(false)}><li>Champions</li></Link>
        <Link to="/other" onClick={() => setMenuOpen(false)}><li>Resources</li></Link>
      </ul>
    </div>
  );
}

export default Nav;
