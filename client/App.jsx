import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import ToolContainer from './containers/ToolContainer.jsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainContainer />,
    },
    { path: '/tool', element: <ToolContainer /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
