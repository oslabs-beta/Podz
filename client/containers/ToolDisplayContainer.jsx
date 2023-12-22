import React, { useState } from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolMetric from '../components/ToolMetric.jsx';
import PortInputForm from '../components/PortInputForm.jsx';

const ToolDisplayContainer = () => {
  const [cluster, setCluster] = useState({ data: [] });
  const [metric, setMetric] = useState({});
  const [loading, setLoading] = useState(false);

  function fetchData() {
    setLoading(true);
    fetch('/tool/data')
      .then((response) => response.json())
      .then((data) => {
        setCluster(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='toolDisplayContainer'>
      <ToolTree setToolMetric={setMetric} clusterData={cluster} />
      <div className='toolInfo'>
        {/* <PortInputForm /> */}
        <button className='toolBuild' onClick={fetchData}>
          {loading ? 'Loading ...' : 'Load Cluster'}
        </button>
        <ToolMetric nodeData={metric} />
      </div>
    </div>
  );
};

export default ToolDisplayContainer;
