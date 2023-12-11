import React from 'react';
import logo from '../assets/logo.png';
import name from '../assets/name.png';

const NavBar = () => {
  return (
    <div className='navBar'>
      <img className='navName' src={name} />
      <div className='navTab'>
        <a href='#featureContainer'>Features</a>
        <a href='#demoContainer'>Demo</a>
        <a href='#teamContainer'>Team</a>
      </div>
    </div>
  );
};

export default NavBar;
