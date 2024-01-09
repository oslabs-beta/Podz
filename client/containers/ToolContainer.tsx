import React from 'react';
import ToolBar from '../components/ToolBar';
import ToolDisplayContainer from './ToolDisplayContainer';
import ToolParticles from '../components/ToolParticles';

const ToolContainer = () => {
  return (
    <div className='toolContainer'>
      <ToolBar />
      <ToolDisplayContainer />
      <ToolParticles />
    </div>
  );
};

export default ToolContainer;
