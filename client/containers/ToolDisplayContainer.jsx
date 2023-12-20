import React, { useState } from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolMetric from '../components/ToolMetric.jsx';

const ToolDisplayContainer = () => {
  const [cluster, setCluster] = useState({ data: [] });
  const [metric, setMetric] = useState({});

  function fetchData() {
    fetch('/tool/data')
      .then((response) => response.json())
      .then((data) => {
        setCluster(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='toolDisplayContainer'>
      <ToolTree setToolMetric={setMetric} clusterData={cluster} />
      <div className='toolInfo'>
        <button className='toolBuild' onClick={fetchData}>
          Load Cluster
        </button>
        <ToolMetric nodeData={metric} />
      </div>
    </div>
  );
};

export default ToolDisplayContainer;
