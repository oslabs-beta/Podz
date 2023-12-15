import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BlueWhale from './pages/BlueWhale.jsx';
import Humpback from './pages/Humpback.jsx';
import SpermWhale from './pages/SpermWhale.jsx';


const App = () => {

  return (
    <div>    
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/bluewhale' element={<BlueWhale />}/>
          <Route path='/humpback' element={<Humpback />}/>
          <Route path='/spermwhale' element={<SpermWhale />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;