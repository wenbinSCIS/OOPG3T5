import React, { useState } from 'react';

function TextInput(props) {
    const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const number = `form-group col-md-${props.size}`
  
    return (
      <div className={number} style={{margin:0}}>
        <label style={{margin:0,color:'deepskyblue'}}>{props.title}</label>
        <br></br>
        <input
          type="text"
          className="form-control"
          placeholder={props.hint}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
  
  export default TextInput;