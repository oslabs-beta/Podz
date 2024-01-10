import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoContainer = () => {
  const navigate = useNavigate();

  function tryTool() {
    navigate('/tool');
    scrollTo(0, 0);
  }

  return (
    <div id='demoContainer'>
      <h1>Try Dev Tool</h1>
      <button className='demoButton' onClick={tryTool}>
        Try Tool Now!
      </button>
    </div>
  );
};

export default DemoContainer;
