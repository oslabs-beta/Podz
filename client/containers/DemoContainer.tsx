import React from 'react';
import { useNavigate } from 'react-router-dom';
import Demo from '../assets/demo.gif';
import Apple from '../assets/apple.png';
import Windows from '../assets/windows.png';

const DemoContainer = () => {
  const navigate = useNavigate();

  function tryTool() {
    navigate('https://drive.google.com/file/d/17UkeOMPtxMNtKqfPGadmc_QAQySSnRUQ/view?usp=sharing');
    scrollTo(0, 0);
  }



  return (
    <div id='demoContainer'>
      <h1 className='mainTitle'>Developer Tool</h1>
      <img className='demo' src={Demo} alt='demo' />
      <div className='downloadLinks'>
        <img className='icon' src={Windows} alt='windows'/>
        <a href="https://drive.google.com/file/d/17UkeOMPtxMNtKqfPGadmc_QAQySSnRUQ/view?usp=sharing" className='demoButton'>
          Windows
        </a>
        <img className='icon' src={Apple} alt='apple'/>
        <a href="https://drive.google.com/file/d/1WslKDC6yGFcZjEBCD5cB3wvkEHeDUMoA/view?usp=sharing" className='demoButton'>
          Mac
        </a>
      </div>

    </div>
  );
};

export default DemoContainer;
