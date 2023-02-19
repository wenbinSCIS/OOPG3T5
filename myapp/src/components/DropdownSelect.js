import React, { useState } from 'react';


function Dropdown(props) {
  const [selectedValue, setSelectedValue] = "Please Select";

  function handleValueChange(event) {
    setSelectedValue(event.target.value);
  }

    const number = `form-group col-md-${props.size} mb-1`
  
    return (
       <div className={number} style={{margin:0}}>
        {props.title.length>0 &&
        <label style={{margin:0,color:'deepskyblue'}}>{props.title} </label>
        }
        {
          props.false_header &&
          <br></br>
        }
        <select className="form-control" value={selectedValue} onChange={handleValueChange}>
            
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div> 


    );
  }
  
  export default Dropdown;