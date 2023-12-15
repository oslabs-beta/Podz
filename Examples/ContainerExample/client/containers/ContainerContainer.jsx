import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContainerContainer = () => {
  const navigate = useNavigate();
  const seeShipContainer = () => {
    navigate('/shipcontainer');
  }
  const seeDockerContainer = () => {
    navigate('/dockercontainer');
  }

  return (
    <div id='containerContainer'>
      <h1>Container</h1>
        <button onClick={seeShipContainer}>Ship Container</button>
        <button onClick={seeDockerContainer}>Docker Container</button>
    </div>
  )
}

export default ContainerContainer;