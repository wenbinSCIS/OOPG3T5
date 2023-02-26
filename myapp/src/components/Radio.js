import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Radio({ options, title, size, false_header, name, orientation }) {
  var [selectedOption, setSelectedOption] = useState(null);
  var number = `form col-md-${size} `;
  if(orientation =="horizontal"){
    number = number + " d-flex"
  }
  
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }
  
  return (
    <div className={number} style={{ margin: 0 }}>
      {title.length > 0 && (
        <InputGroup.Text style={{ paddingTop: 2, paddingBottom:2,marginBottom:4 }}>{title}</InputGroup.Text>
      )}
      {false_header && <br />}
      
      {options.map((option,index) => (
        <Form.Check
         
          label={option}
          name={name}
          type="radio"
          id={index}
          key={title}
          style={{ margin: 7 }}
        />
      ))}
      </div>  
  );
}


export default Radio;


