import React, { useState, useEffect }from 'react';
import ToolBar from '../components/ToolBar.jsx';
import ToolDisplayContainer from './ToolDisplayContainer.jsx';

const ToolContainer = () => {
  const [content, setContent] = useState([<h2>hello</h2>])

  useEffect(() => {
  }, [])
  const metrics = [...content]
  const metricsGrabber = async () => {
    try{
      const respons = await fetch('http://localhost:8083/api/v1/services')
      const data = await respons.json();
      console.log(data);
      // const data = await respons.json();
      // metrics.push(<h1>{data}</h1>)
      // setContent(metrics)
      console.log('hello')
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='toolContainer'>
      <ToolBar />
      <ToolDisplayContainer />
    </div>
  );
};

export default ToolContainer;
