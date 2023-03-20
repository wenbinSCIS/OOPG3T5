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
      content: '',
      position: 'absolute',
      top: '65%',
      right: '10%',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid black', 
      transform: 'rotate(0deg)', // Add initial rotation
      transition: 'transform 0.2s ease-out', 
    };
  
    if (selectedValue !== props.options[0]) {

      arrowStyle.transform = 'rotate(180deg)';
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
        <select
        name={props.name}
        className="form-control"
        value={selectedValue}
        onClick={() =>
          setSelectedValue(
            selectedValue === props.options[0] ? props.options[1] : props.options[0]
          )
        }
        onChange={handleValueChange}
      >
        {props.options.map((option, index) => (
          <option key={option.optionName} value={option.optionValue}>
            {option.optionValue}
          </option>
        ))}
      </select>
      <div style={arrowStyle} />
    </div>
  );
}
  
  
  export default Dropdown;