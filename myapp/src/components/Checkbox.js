import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Checkbox({ options, title,size,false_header,name, orientation}) {
  
  var [selectedItems, setSelectedItems] = useState([]);
  var number = `form-group col-md-${size}`
  if(orientation =="horizontal"){
    number = number + " d-flex"
  }

  function handleCheckboxChange(event) {
    var selectedItem = event.target.value;
    var selectedIndex = selectedItems.indexOf(selectedItem);

    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      var newSelectedItems = [...selectedItems];
      newSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(newSelectedItems);
    }
  }
  return (
    <div className={number}>
      
      {title.length>0 &&
       <InputGroup.Text >
       <label style={{margin:1,color:'deepskyblue'}}>{title} </label>
       </InputGroup.Text>
        
      }
      {
        false_header &&
        <br></br>
      }
      <br></br>
      {options.map((option,index) => (

          <Form.Check
            inline
            name={name}
            type="checkbox"
            id={index}
            label={option}
            key={title}
          />

      ))}
    </div>
  );
}
export default Checkbox;

