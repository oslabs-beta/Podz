import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import AtlanticOcean from './containers/AtlanticOcean.jsx';
import PacificOcean from './containers/PacificOcean.jsx';
const App = () => {
    return (React.createElement("div", null,
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { index: true, element: React.createElement(MainContainer, null) }),
                React.createElement(Route, { path: '/atlantic', element: React.createElement(AtlanticOcean, null) }),
                React.createElement(Route, { path: '/pacific', element: React.createElement(PacificOcean, null) })))));
};
export default App;
