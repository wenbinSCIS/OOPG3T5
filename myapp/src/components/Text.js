import React, { useState } from 'react';

function Text(props) {
    const number = `col-md-${props.size}`
    return (
      <div className={number} style={{margin:0, textAlign: props.alignment}}>
        <a style={{"font-size":props.textSize+"px",  }} id = {props.name}> {props.text}</a>
      </div>
    );
  }
  export default Text;