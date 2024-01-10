import React from 'react';
import logo from '../assets/logo.png';

const IntroContainer = () => {
  return (
    <div className='introContainer'>
      <div className='introText'>
        <h1>
          <b>Podz</b>
        </h1>
        <p> Kubernetes Cluster Visualizing System</p>
      </div>
      <img className='introLogo' src={logo} />
    </div>
  );
};

export default IntroContainer;
