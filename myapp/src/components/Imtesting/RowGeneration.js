import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';


function GenerateRow(props) {
  var info = props.info

  var allData = props.allData //useState prop from main
  var setallData = props.setallData //setState prop from main


  useEffect(() => {
    const newElements = {};
    for(let i=0; i<info.length; i++){
      const element = info[i];
      if (element["elementType"] === "Textinput" && !(element["elementName"] in allData)) {
        newElements[element["elementName"]] = "";
        setallData(prevState => ({
          ...prevState,
          ...newElements
        }));
      }
    }
  }, [allData]);

  const handleTextinChange = e => {
    const {name , value} = e.target;
    setallData(prevState => ({
      ...prevState,
      [name]: value
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
          onChange={handleTextinChange}
          text={text}
        />
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