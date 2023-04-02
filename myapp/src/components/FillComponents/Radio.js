import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextInput from './TextInput';
import CloseButton from 'react-bootstrap/CloseButton';


function Radio({ data, onChange, options, title, size, false_header, name, orientation, generateFor , handleDelete, fillFor}) {

  var [selectedOption, setSelectedOption] = useState('');
  // var [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (data !== undefined) {
      setSelectedOption(prevData => ({ ...prevData, ...data }));
    }
  }, []); // empty dependency array to run the effect only once


  var number = `form col-md-${size}`;
  if(orientation === "horizontal"){
    number = number + " d-flex"
  }

  function handleRadioChange(event) {
    var useStateobj = {
      name: event.target.value,
      type: event.target.dataset.format,
      text: ""
    };
    setSelectedOption(event.target.value);
    onChange(name, useStateobj)    
  }
  function handleTextinChange(parentName,parentRadioValue, event) {
    // const inputName = e.target.name;
    console.log(event.target.value)
    var useStateobj = {
      name: parentRadioValue,
      type: "radio-text",
      text: event.target.value
    };
    console.log(useStateobj)
    onChange(parentName, useStateobj);
  }
  return (
    <div className={number} style={{ margin: 0 }}>
       {
          generateFor==="AdminCreation" &&
          <CloseButton onClick={handleDelete} value={name}/>
          }
      {title.length > 0 && (
        <InputGroup.Text style={{ paddingTop: 2, paddingBottom:2,marginBottom:2 ,backgroundColor: generateFor !== fillFor ? "#cbcbcc" : "#eff1f5"}}>{title}</InputGroup.Text>
      )}
      {false_header && <br />}
      {options.map((option,index) => option.optionType === "radio-text" ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Check
            label={option.optionValue}
            checked={data != null && data.name == option.optionValue ? true : false}
            name={name}
            type="radio"
            key={index}
            value = {option.optionValue}
            onChange={(e) => {handleRadioChange(e); }}
            style={
              generateFor !== fillFor ?{
                margin: '7px',
                cursor: 'not-allowed',
                pointerEvents: 'none',
              }:
              {
                margin: '7px',
            }}
            data-format="radio-text"
          />
            <TextInput title={option.textVariables.header} hint={option.textVariables.hintText} hintPosition={option.textVariables.hintPosition} name = {option.optionName + "_text"} false_header={false_header} disabled={data != null && data.name == option.optionValue ? false : true} 
            onChange={(e) => handleTextinChange(name,option.optionValue, e)}
            text={data!==undefined?data.text:''}
            generateFor={
              generateFor
            }
            /> 
          </div>
        
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Check
            label={option.optionValue}
            checked={data != null && data.name == option.optionValue ? true : false}
            name={name}
            type="radio"
            data-format="radio"
            key={index}
            value = {option.optionValue}
            onChange={(e) => handleRadioChange(e)}
            style={
              generateFor !== fillFor ?{
                margin: '7px',
                cursor: 'not-allowed',
                pointerEvents: 'none',
              }:
              {
                margin: '7px',
            }}
          />
          </div>
      )
      )}
      
      </div>  
  );
}


export default Radio;


