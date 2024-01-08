import React from 'react';
import NavBar from '../components/NavBar.jsx';
import IntroContainer from './IntroContainer.jsx';
import FeatureContainer from './FeatureContainer.jsx';
import DemoContainer from './DemoContainer.jsx';
import TeamContainer from './TeamContainer.jsx';
import MainParticle from '../components/MainParticle.jsx';

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
