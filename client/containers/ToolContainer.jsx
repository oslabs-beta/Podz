import React from 'react';
import ToolBar from '../components/ToolBar.jsx';
import ToolDisplayContainer from './ToolDisplayContainer.jsx';

const ToolContainer = () => {
  return (
    <div className='toolContainer'>
      <ToolBar />
      <ToolDisplayContainer />
    </div>
  );
};

export default ToolContainer;
