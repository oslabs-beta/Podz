import React from 'react';
import { useNavigate } from 'react-router-dom';
import Demo from '../assets/demo.gif';

const DemoContainer = () => {
  const navigate = useNavigate();

  function tryTool() {
    navigate('/tool');
    scrollTo(0, 0);
  }

  return (
    <div id='demoContainer'>
      <h1 className='mainTitle'>Developer Tool</h1>
      <img className='demo' src={Demo} alt='demo' />
      <button className='demoButton' onClick={tryTool}>
        Try Tool Now!
      </button>
    </div>
  );
};

export default DemoContainer;
