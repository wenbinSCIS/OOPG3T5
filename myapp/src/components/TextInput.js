import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Text from './Text';
import CloseButton from 'react-bootstrap/CloseButton';

function TextInput(props) {
  //console.log(props)
  var number = `form-group col-md-${props.size} mb-1 mt-1`

  if (props.size == undefined){
    number = `form-group`
  }
    var inlineHint = "";
    if(props.hintPosition == "hint"){
      inlineHint = props.hint
    }
    return (
      <div className={number} style={{margin:0}}>
        {
          props.generateFor==="Admin" &&
          <CloseButton variant='blue' onClick={props.handleDelete} value={props.name}/>
        }
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
          <InputGroup.Text style={{
            backgroundColor: props.generateFor === "Approver" ? "#f4dcb7" : "#eff1f5",
          }}>{props.hint}</InputGroup.Text>
        }
        {
          <Form.Control
                    id={props.name}
                    name={props.name}
                    placeholder={inlineHint}
                    value={props.text}
                    onChange={props.onChange}
                    data-format="textinput"
                    disabled={props.disabled !== null ? props.disabled : false}
                    style={{
                      backgroundColor: props.generateFor === "Approver" ? "#fdf9f3" : "#fafbfc",
                      cursor: props.generateFor === "Approver" ? "not-allowed" : "auto",
                      pointerEvents: props.generateFor === "Approver" ? "none" : "auto"
                    }}
                  />
        }
        </InputGroup>
        {props.hintPosition == "under" &&
          <a style={{margin:0,fontSize:'0.8rem',opacity: 0.8}}>{props.hint}</a>
        }
        
      </div>
    );
  }
  export default TextInput;