import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextInput from './TextInput';

function Checkbox({ options,title,size,false_header,name,orientation}) {

  console.log(orientation)
  
  const [selectedItems, setSelectedItems] = useState([]);

  var number = `form-group col-md-${size}`
  if(orientation =="horizontal"){
    number = number + " d-flex"
  }

  function handleCheckboxChange(event) {
    var selectedItem = event.target.value;
    var selectedType = event.target.dataset.format;
  
    var selectedIndex = selectedItems.findIndex(
      item => item.name === selectedItem && item.type === selectedType
    );
  
    var useStateobj = {
      name: selectedItem,
      type: selectedType,
      text: ""
    };
  
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, useStateobj]);
    } else {
      var newSelectedItems = [...selectedItems];
      newSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(newSelectedItems);
    }
  }
 
  function handleTextinChange(e) {
    const inputName = e.target.name;
    const inputText = e.target.value;
    const newSelectedItems = [...selectedItems];
  
    const selectedItemIndex = newSelectedItems.findIndex(item => item.name === inputName && item.type === 'checkbox-text');
  
    if (selectedItemIndex > -1) {
      const selectedItem = newSelectedItems[selectedItemIndex];
      selectedItem.text = inputText;
  
      newSelectedItems.splice(selectedItemIndex, 1, selectedItem);
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
      {options.map((option,index) => option.optionType == "checkbox-text" ? (
        <div>
          <Form.Check
            label={option.optionValue}
            name={name}
            type="checkbox"
            data-format = "checkbox-text"
            key={index}
            id={index}
            value = {option.optionValue}
            onChange={(e) => handleCheckboxChange(e)}
            style={{ margin: 1 }}
          />
            <TextInput
            title={option.textVariables.header}
            hint={option.textVariables.hintText}
            hintPosition={option.textVariables.hintPosition}
            name={option.optionValue} // use a unique name for each TextInput component
            false_header={false_header}
            onChange={(e) => handleTextinChange(e)}
            text={selectedItems.find(item => item.name === option.optionValue && item.type === 'checkbox-text')?.text || ''}
      />
        </div>
        
      ) : (
        <Form.Check
            label={option.optionValue}
            name={name}
            type="checkbox"
            data-format = "checkbox"
            key={index}
            id={index}
            value = {option.optionValue}
            onChange={(e) => handleCheckboxChange(e)}
            style={{ margin: 1 }}
          />
          )
      )}
    </div>  
  );
}

export default Checkbox;

