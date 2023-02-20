import React, { useState } from 'react';

function Radio({ options, title, size, false_header, name }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const number = `form-group col-md-${size}`;

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  return (
    <div className={number} style={{ margin: 0 }}>
      {title.length > 0 && (
        <label style={{ margin: 0, color: 'deepskyblue' }}>{title} </label>
      )}
      {false_header && <br />}
      {options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {' ' + option}
          </label>
        </div>
      ))}
    </div>
  );
}

function RadioOption({ name, value, checked, onChange }) {
  return (
    <input type="radio" name={name} value="xx" checked={checked} onChange={onChange} />
  );
}

export default Radio;

