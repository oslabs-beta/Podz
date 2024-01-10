import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import BlueWhale from './containers/BlueWhale.jsx';
import Humpback from './containers/Humpback.jsx';
import SpermWhale from './containers/SpermWhale.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainContainer />} />
          <Route path='/bluewhale' element={<BlueWhale />} />
          <Route path='/humpback' element={<Humpback />} />
          <Route path='/spermwhale' element={<SpermWhale />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
