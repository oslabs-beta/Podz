import React from 'react';

const ToolMetric = ({ nodeData }) => {
  return (
    <div className='toolMetric'>
      <button className='toolBuild'>Load Cluster</button>
      <div className='toolInfo'>
        <h3>Name: {nodeData.id}</h3>
        <h3>Status: </h3>
        <h3>Group: {nodeData.group}</h3>
      </div>
    </div>
  );
};

export default ToolMetric;
