import React, { useState } from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolForm from '../components/ToolForm.jsx';
import ToolMetric from '../components/ToolMetric.jsx';

const ToolDisplayContainer = () => {
  const [cluster, setCluster] = useState({ data: [] });
  const [metric, setMetric] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputAdded, setInputAdded] = useState(false);

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

  function inputLoaded() {
    setInputAdded(true);
  }

  return (
    <div className='toolDisplayContainer'>
      <ToolTree setToolMetric={setMetric} clusterData={cluster} />
      <div className='toolInfo'>
        {!inputAdded ? (
          <ToolForm inputStatus={inputLoaded} />
        ) : (
          <button className='toolBuild' onClick={fetchData}>
            {loading ? 'Loading ...' : 'Load Cluster'}
          </button>
        )}
        <ToolMetric nodeData={metric} />
      </div>
    </div>
  );
};

export default ToolDisplayContainer;
