import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import ToolContainer from './containers/ToolContainer.jsx';
const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: React.createElement(MainContainer, null),
        },
        { path: '/tool', element: React.createElement(ToolContainer, null) },
    ]);
    return (React.createElement("div", null,
        React.createElement(RouterProvider, { router: router })));
};
export default App;
