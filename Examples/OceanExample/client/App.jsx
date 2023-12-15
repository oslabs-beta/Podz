import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AtlanticOcean from './pages/AtlanticOcean.jsx';
import PacificOcean from './pages/PacificOcean.jsx';

const App = () => {

  return (
    <div>    
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/atlanticocean' element={<AtlanticOcean />}/>
          <Route path='/pacificocean' element={<PacificOcean />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;