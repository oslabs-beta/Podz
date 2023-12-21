import React from 'react';
import ToolBar from '../components/ToolBar.jsx';
import ToolDisplayContainer from './ToolDisplayContainer.jsx';
import DustParticles from '../components/DustParticles.jsx';

const ToolContainer = () => {
  return (
    <div className='toolContainer'>
      <ToolBar />
      <ToolDisplayContainer />
      <DustParticles />
    </div>
  );
};

export default ToolContainer;
