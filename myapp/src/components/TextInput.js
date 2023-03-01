import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function TextInput(props) {
    const [text , setText] = useState('');  
    const number = `form-group col-md-${props.size} mb-1`
    var inlineHint = "";
    if(props.hintPosition == "hint"){
      inlineHint = props.hint
    }
    return (
      <div className={number} style={{margin:0}}>
        {props.title.length>0 &&
        <label style={{margin:0,color:'deepskyblue'}}>{props.title}</label>
        }
        {
          props.false_header &&
          <br></br>
        }
        <InputGroup >
        {
          props.hintPosition == "front" &&
          <InputGroup.Text >{props.hint}</InputGroup.Text>
        }
        {(
          props.disabled === null ? 
          <Form.Control
            id={props.name}
            placeholder={inlineHint}
            value = {text}
            onChange ={(e) => setText(e.target.value)}
            disabled={props.disabled}
          /> :
          <Form.Control
            id={props.name}
            placeholder={inlineHint}
            value = {text}
            onChange ={(e) => setText(e.target.value)}
          />
        )}
        
        </InputGroup>
        {props.hintPosition == "under" &&
          <a style={{margin:0,fontSize:'0.8rem',opacity: 0.8}}>{props.hint}</a>
        }
      </div>
    );
  }
  export default TextInput;