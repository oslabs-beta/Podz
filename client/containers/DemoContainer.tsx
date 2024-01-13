import React from 'react';
import Demo from '../assets/demo.gif';
import Apple from '../assets/apple.png';
import Windows from '../assets/windows.png';

const DemoContainer = () => {
  return (
    <div id='demoContainer'>
      <h1 className='mainTitle'>Developer Tool</h1>
      <img className='demo' src={Demo} alt='demo' />
      <div className='downloadLinks'>
        <a href='https://drive.google.com/file/d/17W3w_9TFwZ2goIsM2jlCajNXFAlPS2Qb/view?usp=sharing'>
          <button className='downloadButton'>
            <img className='downloadIcon' src={Windows} alt='windows' />
            Windows
          </button>
        </a>
        <a href='https://drive.google.com/file/d/17VDwq2wyQsxtfEFHhfXv6-vDS5N8K-0w/view?usp=sharing'>
          <button className='downloadButton'>
            <img className='downloadIcon' src={Apple} alt='apple' />
            MacOS
          </button>
        </a>
      </div>
    </div>
  );
};

export default DemoContainer;
