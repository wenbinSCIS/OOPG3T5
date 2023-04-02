import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextInput from './TextInput';

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";


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
    <div style={{ position: "relative" }}>
      {generateFor === "AdminCreation" && (
        <IconButton
          onClick={(event) => {
            const newEvent = Object.assign({}, event, {
              target: { value: name },
            });
            handleDelete(newEvent);
          }}
        >
          <HighlightOffIcon
            fontSize="large"
            sx={{ color: "red", marginLeft: -1 }}
          />
        </IconButton>
      )}
      <div className={number} style={{ margin: 0, marginLeft: -15 }}>
        {title.length > 0 && (
          <InputGroup.Text
            style={{
              paddingTop: 2,
              paddingBottom: 2,
              marginBottom: 2,
              backgroundColor: generateFor !== fillFor ? "#cbcbcc" : "#eff1f5",
            }}
          >
            {title}
          </InputGroup.Text>
        )}
        {false_header && <br />}
        {options.map((option, index) =>
          option.optionType === "radio-text" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Check
                label={option.optionValue}
                checked={
                  data != null && data.name == option.optionValue ? true : false
                }
                name={name}
                type="radio"
                key={index}
                value={option.optionValue}
                onChange={(e) => {
                  handleRadioChange(e);
                }}
                style={
                  generateFor !== fillFor
                    ? {
                        margin: "7px",
                        cursor: "not-allowed",
                        pointerEvents: "none",
                      }
                    : {
                        margin: "7px",
                      }
                }
                data-format="radio-text"
              />
              <TextInput
                title={option.textVariables.header}
                hint={option.textVariables.hintText}
                hintPosition={option.textVariables.hintPosition}
                name={option.optionName + "_text"}
                false_header={false_header}
                disabled={
                  data != null && data.name == option.optionValue ? false : true
                }
                onChange={(e) =>
                  handleTextinChange(name, option.optionValue, e)
                }
                text={data !== undefined ? data.text : ""}
                generateFor={generateFor}
                isFromOtherElement = {true} // added so that we will not create the x button on top of it
              />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Check
                label={option.optionValue}
                checked={
                  data != null && data.name == option.optionValue ? true : false
                }
                name={name}
                type="radio"
                data-format="radio"
                key={index}
                value={option.optionValue}
                onChange={(e) => handleRadioChange(e)}
                style={
                  generateFor !== fillFor
                    ? {
                        margin: "7px",
                        cursor: "not-allowed",
                        pointerEvents: "none",
                      }
                    : {
                        margin: "7px",
                      }
                }
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}


export default Radio;


