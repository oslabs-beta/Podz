import React from 'react';
import name from '../assets/name.png';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  function returnHome() {
    navigate('/');
    scrollTo(0, 0);
  }

  return (
    <div className='navBar'>
      <img className='navName' src={name} onClick={returnHome} />
      <div className='navTab'>
        <a href='#featureContainer'>Features</a>
        <a href='#demoContainer'>Demo</a>
        <a href='#teamContainer'>Team</a>
      </div>
    </div>
  );
};

export default NavBar;
