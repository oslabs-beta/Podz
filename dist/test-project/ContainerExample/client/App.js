import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import ShipContainer from './containers/ShipContainer.jsx';
import DockerContainer from './containers/DockerContainer.jsx';
const App = () => {
    return (React.createElement("div", null,
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { index: true, element: React.createElement(MainContainer, null) }),
                React.createElement(Route, { path: '/ship', element: React.createElement(ShipContainer, null) }),
                React.createElement(Route, { path: '/docker', element: React.createElement(DockerContainer, null) })))));
};
export default App;
