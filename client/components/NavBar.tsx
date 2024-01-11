import React from 'react';
import { useNavigate } from 'react-router-dom';
import GitHub from '../assets/github.png';
import LinkedIn from '../assets/linkedin.png';

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
        <a href='https://github.com/oslabs-beta/Podz'>
          <img className='navLogo' src={GitHub} alt='github' />
        </a>
        <a href='https://www.linkedin.com/company/podzapp'>
          <img className='navLogo' src={LinkedIn} alt='linkedin' />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
