import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Dropdown from './DropdownSelect';


function GenerateRow(props) {
  var info = props.info

  var allData = props.allData //useState prop from main
  var setallData = props.setallData //setState prop from main


  useEffect(() => {
    const newElements = {};
    for(let i=0; i<info.length; i++){
      const element = info[i];
      if ((element["elementType"] === "Textinput" || element["elementType"] === "Dropdown")  && !(element["elementName"] in allData)) {
        newElements[element["elementName"]] = "";
        setallData(prevState => ({
          ...prevState,
          ...newElements
        }));
      }
    }
  }, [allData]);

  const handleInputChange = e => {
    const {name , value} = e.target;
    setallData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleValueChange = (elementName, value) => {
    setallData(prevState => ({
      ...prevState,
      [elementName]: value
    }));
  }

  const to_return = [];
  var false_header=false;
  for(let i=0;i<info.length;i++){
    const element = info[i];
    const inputType = element["elementType"];
    if("size" in element){
      var dimensions = parseInt(element["size"])
    }
    else{
        var dimensions = 12 /info.length
    }
    if(inputType==="Textinput"){
      if(i>0 && info[0]["elementHeader"].length>0){
          false_header = true;
      }
      const text = allData[element["elementName"]] || "";
      to_return.push(
        <TextInput
          title={element["elementHeader"]}
          hint={element["placeholder"]}
          hintPosition={element["placeholderPosition"]}
          size={dimensions}
          name={element["elementName"]}
          false_header={false_header}
          onChange={handleInputChange}
          text={text}
        />
      );
    }
    //dropdown here
    else if(inputType=="Dropdown"){
      if(i>0 && info[0]["elementHeader"].length>0){
          var false_header = true
      }
      to_return.push(<Dropdown title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} false_header={false_header} onChange={handleInputChange}></Dropdown>)
      
    }
    //checkbox
    else if(inputType=="Checkbox"){
      if(i>0 && info[0]["elementHeader"].length>0){
          var false_header = true
      }
      to_return.push(<Checkbox title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} false_header={false_header} orientation={element["elementOrientation"]} onChange={handleValueChange}></Checkbox>)       
    }
    else if (inputType == "Radio") {
      to_return.push(
        <Radio title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} orientation={element["elementOrientation"]}  onChange={handleValueChange}></Radio>
      );
    }   
  }

  return (
    <div className='row'>
      {to_return}
    </div>
  );
}


  export default GenerateRow;