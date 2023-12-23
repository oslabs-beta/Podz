import React from 'react';
<<<<<<< HEAD
import name from '../assets/name.png';
=======
>>>>>>> 08e01b5952c4512513118d5d2bb970dd91a52f1c
import { useNavigate } from 'react-router-dom';

const ToolBar = () => {
  const navigate = useNavigate();
  function returnHome() {
    navigate('/');
    scrollTo(0, 0);
  }

  return (
    <div className='toolBar'>
<<<<<<< HEAD
      <img className='toolName' src={name} onClick={returnHome} />
=======
      <div className='toolName' onClick={returnHome}>
        Podz
      </div>
      <div></div>
>>>>>>> 08e01b5952c4512513118d5d2bb970dd91a52f1c
    </div>
  );
};

export default ToolBar;
