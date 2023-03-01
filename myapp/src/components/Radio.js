import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextInput from './TextInput';


function Radio({ options, title, size, false_header, name, orientation }) {

  var [selectedOption, setSelectedOption] = useState('');
  var [disabled, setDisabled] = useState(true);
  var number = `form col-md-${size} `;
  if(orientation === "horizontal"){
    number = number + " d-flex"
  }
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    
    console.log(disabled)
  }
  return (
    <div className={number} style={{ margin: 0 }}>
      {title.length > 0 && (
        <InputGroup.Text style={{ paddingTop: 2, paddingBottom:2,marginBottom:4 }}>{title}</InputGroup.Text>
      )}
      {false_header && <br />}
      {options.map((option,index) => option.optionType === "radio-text" ? (
        <div>
          <Form.Check
            label={option.optionValue}
            name={name}
            type="radio"
            key={index}
            value = {option.optionValue}
            onChange={(e) => {handleOptionChange(e); setDisabled(!disabled);}}
            style={{ margin: 7 }}
          />
            <TextInput title={option.textVariables.header} hint={option.textVariables.hintText} hintPosition={option.textVariables.hintPosition} name = {option.optionName + "_text"}false_header={false_header} disabled={disabled}></TextInput>
          </div>
        
      ) : (
        <Form.Check
            label={option.optionValue}
            name={name}
            type="radio"
            key={index}
            value = {option.optionValue}
            onChange={(e) => handleOptionChange(e)}
            style={{ margin: 7 }}
          />
      )
      )}
      </div>  
  );
}


export default Radio;


