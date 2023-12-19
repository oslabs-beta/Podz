import React from 'react';
import name from '../assets/name.png';

const ToolBar = () => {
  const metricsGrabber = () => {
    
  }
  return (
    <div className='toolBar'>
      <img className='toolName' src={name} />
      <button className='toolLogin' onClick={metricsGrabber}>GitHub Login</button>
    </div>
  );
};

export default ToolBar;
