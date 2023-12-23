import React from 'react';
<<<<<<< HEAD
import name from '../assets/name.png';
=======
>>>>>>> 08e01b5952c4512513118d5d2bb970dd91a52f1c
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  function returnHome() {
    navigate('/');
    scrollTo(0, 0);
  }

  return (
    <div className='navBar'>
<<<<<<< HEAD
      <img className='navName' src={name} onClick={returnHome} />
=======
      <div className='navName' onClick={returnHome}>
        Podz
      </div>
>>>>>>> 08e01b5952c4512513118d5d2bb970dd91a52f1c
      <div className='navTab'>
        <a href='#featureContainer'>Features</a>
        <a href='#demoContainer'>Demo</a>
        <a href='#teamContainer'>Team</a>
      </div>
    </div>
  );
};

export default NavBar;
