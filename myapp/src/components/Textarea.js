import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Textarea(props) {
    /* const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
      props.onChange(event)
    }; */
    const number = `form-group col-md-${props.size}`
    
    
    
    return (
      <div className={number} style={{margin:0}}>
        <label style={{margin:0,color: props.generateFor === "Approver" ? "#d5b17a" : "deepskyblue"}}>{props.title}</label>
        <br></br>
        <textarea
          name={props.name}
          key={props.name}
          className="form-control"
          placeholder={props.hint}
          value={props.text}
          onChange={props.onChange}
          rows="4"
          cols="50"
          style={{
            backgroundColor: props.generateFor === "Approver" ? "#fdf9f3" : "#fff",
            cursor: props.generateFor === "Approver" ? "not-allowed" : "auto",
            pointerEvents: props.generateFor === "Approver" ? "none" : "auto"
          }}
          
        >
        </textarea>
        {
          props.generateFor==="Admin" &&
          <Button onClick={props.handleDelete} value={props.name} variant="danger">Delete Element</Button>
        }
      </div>
    );
  }
  
  export default Textarea;