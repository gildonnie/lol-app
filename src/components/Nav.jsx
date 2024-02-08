import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Nav.scss';


function Nav() {

    return (
        <div className='containerNav'>
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/champions"><li>Champions</li></Link>
                <Link to="/other"><li>Other</li></Link>
            </ul>
        </div>

    );
}

export default Nav;
