import React, { useState, useEffect }from 'react';

const Text = () => {
  return (
    <div>
      <h1>HIIIIII THEREEEEE</h1>
    </div>
  )
}

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
      <h1>Nothing Yet</h1>
      <button onClick={metricsGrabber}>Grab metrics!</button>
      {content}
      <Text/>
    </div>
  );
};

export default ToolContainer;
