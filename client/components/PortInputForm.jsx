import React from 'react';

const PortInputForm = () => {
  return (
    <div className='Input'>
      <label for='portInputForm'>Port:</label>
      <input
        type='text'
        id='portInputForm'
        required
        minlength='4'
        maxlength='5'
      ></input>
    </div>
  );
};

export default PortInputForm;
