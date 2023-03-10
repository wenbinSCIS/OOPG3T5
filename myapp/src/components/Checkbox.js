import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextInput from './TextInput';

function Checkbox({data,onChange, options,title,size,false_header,name,orientation}) {


 var [selectedItems, setSelectedItems] = useState([]);

  if(data!==undefined){
    selectedItems = data
  }

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
    var newSelectedItems = []
    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, useStateobj]
      setSelectedItems([...selectedItems, useStateobj]);
    } else {
      var newSelectedItems = [...selectedItems];
      newSelectedItems.splice(selectedIndex, 1);      
    }
    setSelectedItems(newSelectedItems);
    onChange(name, newSelectedItems)    
  }
  function handleTextinChange(parentName ,parentCheckboxValue, e) {
    // const inputName = e.target.name;
    const inputText = e.target.value;
    const newSelectedItems = [...selectedItems];
  
    const selectedItemIndex = newSelectedItems.findIndex(item => item.name === parentCheckboxValue && item.type === 'Checkbox-text');
    if (selectedItemIndex > -1) {
      const selectedItem = newSelectedItems[selectedItemIndex];
      selectedItem.text = inputText;
      newSelectedItems.splice(selectedItemIndex, 1, selectedItem);
    }
    setSelectedItems(newSelectedItems);
    onChange(parentName, newSelectedItems)
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
      {options.map((option,index) => option.optionType == "Checkbox-text" ? (
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <Form.Check
            label={option.optionValue}
            checked={data != null && data.find(item => item.name === option.optionValue) ? true : false}            
            name={name}
            type="Checkbox"
            data-format = "Checkbox-text"
            key={option}
            id={index}
            value = {option.optionValue}
            onChange={(e) => handleCheckboxChange(e)}
            style={{ margin: 5}}
          />
            <TextInput
            key="test"
            title={option.textVariables.header}
            hint={option.textVariables.hintText}
            hintPosition={option.textVariables.hintPosition}
            name={option.optionValue + "_text"} // use a unique name for each TextInput component
            false_header={false_header}
            onChange={(e) => handleTextinChange(name,option.optionValue, e)}
            text={data != null && data.find(item => item.name === option.optionValue && item.type === "Checkbox-text") ? data.find(item => item.name === option.optionValue && item.type === "Checkbox-text").text : ""}
            disabled={data != null && data.find(item => item.name === option.optionValue) ? false : true}
      />
        </div>
        
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Check
            label={option.optionValue}
            checked={data != null && data.find(item => item.name === option.optionValue) ? true : false}            
            name={name}
            type="Checkbox"
            data-format = "Checkbox"
            key={option}
            id={index}
            value = {option.optionValue}
            onChange={(e) => handleCheckboxChange(e)}
            style={{ margin: 5 }}
          />
          </div>
          )
      )}
    </div>  
  );
}

export default Checkbox;

