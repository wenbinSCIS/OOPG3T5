import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Text(props) {
    const number = `col-md-${props.size}`
    return (
      <div className={number} style={{margin:0, textAlign: props.alignment}}>
        <a style={{fontSize:props.textSize+"px",  }} id = {props.name}> {props.text}</a>
        {
          props.generateFor==="Admin" &&
          <Button onClick={props.handleDelete} value={props.name} variant="danger">Delete Element</Button>
        }
      </div>
    );
  }
  export default Text;