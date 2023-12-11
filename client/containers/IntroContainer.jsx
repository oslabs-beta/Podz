import React from 'react';
import logo from '../assets/logo.png';

const IntroContainer = () => {
  return (
    <div className='introContainer'>
      <div className='introText'>
        <h1>Kubernetes Cluster Metric Visualizer</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt sint ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex sint ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <img className='introLogo' src={logo} />
    </div>
  );
};

export default IntroContainer;
