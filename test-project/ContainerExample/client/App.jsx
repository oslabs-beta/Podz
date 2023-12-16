import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import ShipContainer from './containers/ShipContainer.jsx';
import DockerContainer from './containers/DockerContainer.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainContainer />} />
          <Route path='/ship' element={<ShipContainer />} />
          <Route path='/docker' element={<DockerContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
