import React from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolMetric from '../components/ToolMetric.jsx';

const ToolDisplayContainer = () => {
  return (
    <div className='toolDisplayContainer'>
      <ToolTree />
      <ToolMetric />
    </div>
  );
};

export default ToolDisplayContainer;
