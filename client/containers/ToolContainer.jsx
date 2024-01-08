import React from 'react';
import ToolBar from '../components/ToolBar.jsx';
import ToolDisplayContainer from './ToolDisplayContainer.jsx';
import ToolParticles from '../components/ToolParticles.jsx';

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
