import React from 'react';
import ToolBar from '../components/ToolBar.jsx';
import ToolDisplayContainer from './ToolDisplayContainer.jsx';
import DustParticles from '../components/DustParticles.jsx';
const ToolContainer = () => {
    return (React.createElement("div", { className: 'toolContainer' },
        React.createElement(ToolBar, null),
        React.createElement(ToolDisplayContainer, null),
        React.createElement(DustParticles, null)));
};
export default ToolContainer;
