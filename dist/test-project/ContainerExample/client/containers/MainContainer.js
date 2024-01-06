import React from 'react';
import ContainerContainer from './ContainerContainer.jsx';
const MainContainer = () => {
    return (React.createElement("div", { className: 'mainContainer' },
        React.createElement(ContainerContainer, null)));
};
export default MainContainer;
