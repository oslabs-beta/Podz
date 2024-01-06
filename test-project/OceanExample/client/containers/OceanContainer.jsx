import React from 'react';
import { useNavigate } from 'react-router-dom';

const OceanContainer = () => {
  const navigate = useNavigate();

  const seeAtlanticOcean = () => {
    navigate('/atlantic');
  };

  const seePacificOcean = () => {
    navigate('/pacific');
  };

  return (
    <div id='oceanContainer'>
      <h1>Ocean</h1>
      <button onClick={seeAtlanticOcean}>Atlantic Ocean</button>
      <button onClick={seePacificOcean}>Pacific Ocean</button>
    </div>
  );
};

export default OceanContainer;
