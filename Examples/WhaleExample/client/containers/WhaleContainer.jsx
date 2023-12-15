import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhaleContainer = () => {
  const navigate = useNavigate();
  const seeBlueWhale = () => {
    navigate('/bluewhale');
    // fetch('http://localhost:10000')
    // .catch(error => console.log('This is an error'));
  }
  const seeHumpback = () => {
    navigate('/humpback');
  }
  const seeSpermWhale = () => {
    navigate('/spermwhale');
  }

  return (
    <div id='whaleContainer'>
      <h1>Whale</h1>
        <button onClick={seeBlueWhale}>Blue Whale</button>
        <button onClick={seeHumpback}>Humpback Whale</button>
        <button onClick={seeSpermWhale}>Sperm Whale</button>
    </div>
  )
}

export default WhaleContainer;