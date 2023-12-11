import React from 'react';
import { useNavigate } from 'react-router-dom';

const DemoContainer = () => {
  const navigate = useNavigate();
  function tryTool() {
    navigate('/tool');
  }

  return (
    <div id='demoContainer'>
      <h1>Try Dev Tool</h1>
      <button onClick={tryTool}>Try Tool Now!</button>
    </div>
  );
};

export default DemoContainer;
