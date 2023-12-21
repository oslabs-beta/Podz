import React from 'react';
import name from '../assets/name.png';
import { useNavigate } from 'react-router-dom';

const ToolBar = () => {
  const navigate = useNavigate();
  function returnHome() {
    navigate('/');
    scrollTo(0, 0);
  }

  return (
    <div className='toolBar'>
      <img className='toolName' src={name} onClick={returnHome} />
    </div>
  );
};

export default ToolBar;
