import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import AtlanticOcean from './containers/AtlanticOcean.jsx';
import PacificOcean from './containers/PacificOcean.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainContainer />} />
          <Route path='/atlantic' element={<AtlanticOcean />} />
          <Route path='/pacific' element={<PacificOcean />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
