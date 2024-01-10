import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  function returnHome() {
    navigate('/');
    scrollTo(0, 0);
  }

  return (
    <div className='navBar'>
      <div className='navName' onClick={returnHome}>
        Podz
      </div>
      <div className='navTab'>
        <a href='#featureContainer'>Features</a>
        <a href='#demoContainer'>Demo</a>
        <a href='#teamContainer'>Team</a>
      </div>
    </div>
  );
};

export default NavBar;
