import React from 'react';
import NavBar from '../components/NavBar';
import IntroContainer from './IntroContainer';
import FeatureContainer from './FeatureContainer';
import DemoContainer from './DemoContainer';
import TeamContainer from './TeamContainer';
import MainParticle from '../components/MainParticle';

// React.FC is a ge in TypeScript that stands for 
// "React Functional Component." It's a shorthand for a function 
// component with an implicit children prop and allows you to define 
// the types for the props that your functional component expects
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
