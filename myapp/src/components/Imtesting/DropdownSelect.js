import React, { useState } from 'react';


function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.options[0]);

  function handleValueChange(event) {
    setSelectedValue(event.target.value);
    props.onChange(event)
  }

    const number = `form-group col-md-${props.size} mb-1`
  
    const selectWrapperStyle = {
      position: 'relative',
      margin: 0
    }
  
    const arrowStyle = {
      content: "",
      position: 'absolute',
      top: '65%',
      right: '10%',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #ccc'
    }
  
    return (
      <div className={number} style={selectWrapperStyle}>
        {props.title.length > 0 &&
          <label style={{ margin: 0, color: 'deepskyblue' }}>{props.title} </label>
        }
        {
          props.false_header &&
          <br></br>
        }
        <select name={props.name} className="form-control" value={selectedValue} onChange={handleValueChange}>
          {props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div style={arrowStyle}></div>
      </div>
    );
  }
  
  
  export default Dropdown;