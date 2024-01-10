import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolBar = () => {
  const navigate = useNavigate();

  function returnHome() {
    navigate('/');
    scrollTo(0, 0);
  }

  return (
    <div className='toolBar'>
      <div className='toolName' onClick={returnHome}>
        Podz
      </div>
      <div></div>
    </div>
  );
};

export default ToolBar;
