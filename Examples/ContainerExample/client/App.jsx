import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ShipContainer from './pages/ShipContainer.jsx';
import DockerContainer from './pages/DockerContainer.jsx';



const App = () => {

  return (
    <div>    
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/shipcontainer' element={<ShipContainer />}/>
          <Route path='/dockercontainer' element={<DockerContainer />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;