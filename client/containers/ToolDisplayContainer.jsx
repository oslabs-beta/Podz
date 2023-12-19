import React, { useState } from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolMetric from '../components/ToolMetric.jsx';

const ToolDisplayContainer = () => {
  const dummyData = {
    id: '',
    group: 0,
  };
  const [data, setData] = useState(dummyData);

  return (
    <div className='toolDisplayContainer'>
      <ToolTree setToolMetric={setData} />
      <div className='toolInfo'>
        <button className='toolBuild'>Load Cluster</button>
        <ToolMetric nodeData={data} />
      </div>
    </div>
  );
};

export default ToolDisplayContainer;
