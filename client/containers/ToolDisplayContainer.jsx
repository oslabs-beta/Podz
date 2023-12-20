import React, { useState } from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolMetric from '../components/ToolMetric.jsx';

const ToolDisplayContainer = () => {

  const [data, setData] = useState({});
  const [cluster, setCluster] = useState({ data: [] });

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

  function fetchData() {
    fetch('/tool/data')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='toolDisplayContainer'>
      <ToolTree setToolMetric={setData} cluster={cluster} />
      <div className='toolInfo'>
        <button className='toolBuild' onClick={fetchData}>
          Load Cluster
        </button>
        <ToolMetric nodeData={data} />
      </div>
    </div>
  );
};

export default ToolDisplayContainer;
