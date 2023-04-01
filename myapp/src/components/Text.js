import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

function Text(props) {
    const number = `col-md-${props.size}`
    return (
      <div className={number} style={{margin:0, textAlign: props.alignment}}>
         {
          props.generateFor==="Admin" &&
          <CloseButton variant='blue' onClick={props.handleDelete} value={props.name}/>
          }
        <a style={{fontSize:props.textSize+"px",  }} id = {props.name}> {props.text}</a>
      </div>
    );
  }
  export default Text;