import React from 'react';
import ToolBar from '../components/ToolBar.jsx';
import ToolDisplayContainer from './ToolDisplayContainer.jsx';
import ToolParticle from '../components/ToolParticle.jsx';

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
