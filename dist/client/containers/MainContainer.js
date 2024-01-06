import React from 'react';
import NavBar from '../components/NavBar.jsx';
import IntroContainer from './IntroContainer.jsx';
import FeatureContainer from './FeatureContainer.jsx';
import DemoContainer from './DemoContainer.jsx';
import TeamContainer from './TeamContainer.jsx';
import Particle from '../components/Particle.jsx';
// React.FC is a ge in TypeScript that stands for 
// "React Functional Component." It's a shorthand for a function 
// component with an implicit children prop and allows you to define 
// the types for the props that your functional component expects
const MainContainer;
/>ct.FC = () => {;
return (React.createElement("div", { className: 'mainContainer' },
    React.createElement(NavBar, null),
    React.createElement(IntroContainer, null),
    React.createElement(FeatureContainer, null),
    React.createElement(DemoContainer, null),
    React.createElement(TeamContainer, null),
    React.createElement(Particle, null)));
;
export default MainContainer;
