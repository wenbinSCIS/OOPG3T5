import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextInput from './TextInput';

function Checkbox({ options, title,size,false_header,name,orientation}) {
  
  const [selectedItems, setSelectedItems] = useState([]);

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
      {options.map((option,index) => option.optionType == "checkbox-text" ? (
        <div>
          <Form.Check
            label={option.optionValue}
            name={name}
            type="checkbox"
            key={index}
            id={index}
            value = {option.optionValue}
            onChange={(e) => handleCheckboxChange(e)}
            style={{ margin: 1 }}
          />
            <TextInput title={option.textVariables.header} hint={option.textVariables.hintText} hintPosition={option.textVariables.hintPosition} name = {option.optionName + "_text"}false_header={false_header}></TextInput>
        </div>
        
      ) : (
        <Form.Check
            label={option.optionValue}
            name={name}
            type="checkbox"
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

// (

//   <Form.Check
//     name={name}
//     type="checkbox"
//     id={index}
//     label={option}
//     key={index}
//     style={{margin:5}}
//     onChange = { (e) => handleCheckboxChange(e)}
//     value={option}
//   />
// ))}
// <br></br>
// {additional!=null &&
// additional["elementType"] =="Textinput" &&
// <TextInput title={additional["elementHeader"]} hint={additional["placeholder"]} hintPosition={additional["placeholderPosition"]} name = {additional["elementName"]} false_header={false_header}></TextInput>
// }
// {additional!=null &&
// additional["elementType"] =="Radio" &&
// <Radio title={additional["elementHeader"]} options={additional["options"]} name = {additional["elementName"]} orientation={additional["elementOrientation"]} ></Radio>
// }
export default Checkbox;

