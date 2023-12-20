import React from 'react';
import name from '../assets/name.png';

const ToolBar = () => {
  return (
    <div className='toolBar'>
      <img className='toolName' src={name} />
      <button className='toolLogin'>GitHub Login</button>
    </div>
  );
};

export default ToolBar;
