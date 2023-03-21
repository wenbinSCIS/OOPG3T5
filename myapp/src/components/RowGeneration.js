import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox'
import Radio from './Radio';
import Dropdown from './DropdownSelect';
import Textarea from './Textarea';
import TableComponent from './Table';
import Text from './Text';

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
      else if(element["elementType"]==="Table" && !(element["elementName"] in allData)){
        newElements[element["elementName"]] = Array.from({ length: element['noRows'] }, () => ({}))
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

  const handleTableChange = (event, rowIndex, column, key) => {
    const { value } = event.target;
    setallData(prevData => {
      return {
        ...prevData,
        [key]: prevData[key].map((row, index) => {
          if (index === rowIndex) {
            return { ...row, [column]: value };
          } else {
            return row;
          }
        })
      };
    });
  };
  
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
      to_return.push(<Dropdown data = {allData[element["elementName"]]} title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} false_header={false_header} onChange={handleInputChange}></Dropdown>)
      
    }
    //checkbox
    else if(inputType=="Checkbox"){
      if(i>0 && info[0]["elementHeader"].length>0){
          var false_header = true
      }
      to_return.push(<Checkbox data = {allData[element["elementName"]]} title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} false_header={false_header} orientation={element["elementOrientation"]} onChange={handleValueChange} ></Checkbox>)       
    }
    //radio
    else if (inputType == "Radio") {
      to_return.push(
        <Radio data = {allData[element["elementName"]]} title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} orientation={element["elementOrientation"]}  onChange={handleValueChange}></Radio>
      );
    }
    //textarea
    else if(inputType=="Textarea"){
      const text = allData[element["elementName"]] || "";
      if(i>0 && info[0]["elementHeader"].length>0){
          var false_header = true
      }
      to_return.push( <Textarea title={element["elementHeader"]} hint={element["placeholder"]} hintPosition={element["placeholderPosition"]} size={dimensions} name = {element["elementName"]} false_header={false_header} onChange={handleInputChange} text = {text}></Textarea>)
    } 
    //table
    else if (inputType == "Table") {
      to_return.push(
        <TableComponent  columnHeaders={element["headers"]} size={dimensions} name = {element["elementName"]}  columns={element["noColumns"]} rows={element["noRows"]} onChange={handleTableChange} data = {allData[element["elementName"]]} ></TableComponent>
      );
    }  
    //text
    else if (inputType=="Text"){
      to_return.push( <Text size={dimensions} name = {element["elementName"]} textSize = {element["textSize"] } text = {element["Text"]} alignment = {element["alignment"]}></Text>)
    } 
  }

  return (
    <div className='row'>
      {to_return}
    </div>
  );
}


  export default GenerateRow;