import React, { useState } from 'react';
import { ToolFormProps } from '../../types';

const ToolForm = ({ inputStatus }: ToolFormProps) => {
  const [databaseInput, setDatabaseInput] = useState('');
  const [portInput, setPortInput] = useState('');

  function addInput() {
    fetch('/api/tool/data', {
      method: 'POST',
      body: JSON.stringify({
        databaseLink: databaseInput,
        portNumber: portInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        inputStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='toolForm'>
      <input
        type='text'
        className='database input'
        placeholder='Enter MongoDB Database Link'
        value={databaseInput}
        onChange={(e) => {
          setDatabaseInput(e.target.value);
        }}
      />
      <input
        className='port input'
        placeholder='Enter API Server Proxy Port'
        value={portInput}
        onChange={(e) => {
          setPortInput(e.target.value);
        }}
      />
      <button className='addInput' onClick={addInput}>
        Add Database and Port
      </button>
    </div>
  );
};

export default ToolForm;
