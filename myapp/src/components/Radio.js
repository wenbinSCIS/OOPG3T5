import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Radio({ options, title, size, false_header, name, orientation }) {
  var [selectedOption, setSelectedOption] = useState(null);
  var number = `form col-md-${size} mb-1`;
  if(orientation =="horizontal"){
    number = number + " d-flex"
  }
  
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }
  
  return (
    <div className={number} style={{ margin: 2 }}>
      {title.length > 0 && (
        <InputGroup.Text >{title}</InputGroup.Text>
      )}
      {false_header && <br />}
      <br></br>
      {options.map((option,index) => (
        <Form.Check
          inline
          label={option}
          name={name}
          type="radio"
          id={index}
          key={title}
        />
      ))}
      </div>  
  );
}


export default Radio;


