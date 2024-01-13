import React from 'react';
import GitHub from '../assets/github.png';
import LinkedIn from '../assets/linkedin.png';

const NavBar = () => {
  return (
    <div className='navBar'>
      <div className='navName'>Podz</div>
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
