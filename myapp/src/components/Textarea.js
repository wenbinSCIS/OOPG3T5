import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

function Textarea(props) {
    /* const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
      props.onChange(event)
    }; */
    const number = `form-group col-md-${props.size}`
    
    
    
    return (
      <div className={number} style={{margin:0}}>
         {
          props.generateFor==="AdminCreation" &&
          <CloseButton variant='blue' onClick={props.handleDelete} value={props.name}/>
          }
        <label style={{margin:0,color: props.generateFor === "Vendor" ? "#eff1f5" : props.generateFor === "Approver" ? "#f4dcb7" : "#dfe6b3"}}>{props.title}</label>
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
            backgroundColor: props.generateFor === "Vendor" ? "#fafbfc" : props.generateFor === "Approver" ? "#fdf9f3" : "#f1f4dd",
            cursor: props.generateFor !== props.fillFor ? "not-allowed" : "auto",
            pointerEvents: props.generateFor !== props.fillFor ? "none" : "auto"
          }}
          
        >
        </textarea>
        
      </div>
    );
  }
  
  export default Textarea;