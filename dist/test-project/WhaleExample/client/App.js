import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import BlueWhale from './containers/BlueWhale.jsx';
import Humpback from './containers/Humpback.jsx';
import SpermWhale from './containers/SpermWhale.jsx';
const App = () => {
    return (React.createElement("div", null,
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { index: true, element: React.createElement(MainContainer, null) }),
                React.createElement(Route, { path: '/bluewhale', element: React.createElement(BlueWhale, null) }),
                React.createElement(Route, { path: '/humpback', element: React.createElement(Humpback, null) }),
                React.createElement(Route, { path: '/spermwhale', element: React.createElement(SpermWhale, null) })))));
};
export default App;
