import React from 'react';
import NavBar from '../components/NavBar';
import IntroContainer from './IntroContainer';
import FeatureContainer from './FeatureContainer';
import DemoContainer from './DemoContainer';
import TeamContainer from './TeamContainer';
import MainParticle from '../components/MainParticle';



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
