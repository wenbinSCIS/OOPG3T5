import React, { useState } from 'react';

function Textarea(props) {
    const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const number = `form-group col-md-${props.size}`
  
    return (
      <div className={number} style={{margin:0}}>
        <label style={{margin:0,color:'deepskyblue'}}>{props.title}</label>
        <br></br>
        <textarea
          className="form-control"
          placeholder={props.hint}
          value={value}
          onChange={handleChange}
          rows="4"
          cols="50"
        >
        </textarea>
      </div>
    );
  }
  
  export default Textarea;