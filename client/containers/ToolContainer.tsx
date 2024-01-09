import React from 'react';
import ToolBar from '../components/ToolBar';
import ToolDisplayContainer from './ToolDisplayContainer';
import ToolParticle from '../components/ToolParticle';

const ToolContainer = () => {
  return (
    <div className='toolContainer'>
      <ToolBar />
      <ToolDisplayContainer />
      <ToolParticle />
    </div>
  );
};

export default ToolContainer;
