import React from 'react';
import NavBar from '../components/NavBar.jsx';
import IntroContainer from './IntroContainer.jsx';
import FeatureContainer from './FeatureContainer.jsx';
import DemoContainer from './DemoContainer.jsx';
import TeamContainer from './TeamContainer.jsx';
import MainParticle from '../components/MainParticle.jsx';

const MainContainer = () => {
  return (
    <div className='mainContainer'>
      <NavBar />
      <IntroContainer />
      <FeatureContainer />
      <DemoContainer />
      <TeamContainer />
      <MainParticle />
    </div>
  );
};

export default MainContainer;
