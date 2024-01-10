import React from 'react';
import logo from '../assets/logo.png';

const IntroContainer = () => {
  return (
    <div>
      <div className='introContainer'>
        <div className='introText'>
          <h1>
            <b>Podz</b>
          </h1>
          <p> Kubernetes Cluster Visualizing System</p>
        </div>
        <img className='introLogo' src={logo} />
      </div>
      <div className='introSummaryTitleContainer'>
        <div className='introSummaryTitle'>Meet Podz</div>
        <p className='introSummary'>
          Podz is an intuitive Kubernetes visualizer, utilizing a visually
          appealing tree-style diagram to depict all the components within your
          cluster. Checkout the demo and Github for a more depth look on how
          this tool can make it easier to view and monitor your cluster!
        </p>
      </div>
    </div>
  );
};

export default IntroContainer;
