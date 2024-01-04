import React from 'react';

const inputHandler = async (e) => {
  if(e.target.value.length > e.target.maxLength){
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
  try{
    console.log(e.target.value)
    await fetch('/tool/port?HOST_PORT=' + e.target.value)
  }
  catch(err){
    console.log(err);
  }
}

const PortInputForm = () => {
  return (
    <div className='input'>
      <label for='portInputForm'>Port:</label>
      <input
        placeholder='4321'
        className='inputField' 
        type='number'
        inputMode='numeric'
        id='portInputForm'
        required
        minlength='4'
        maxlength='5'
        onInput={inputHandler}
      ></input>
    </div>
  );
};

export default PortInputForm;
