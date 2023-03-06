import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';

var info = [{
  "elementName":"firstName",
  "elementHeader":"Full Name",
  "placeholder":"First Name",
  "placeholderPosition":"hint", //either hint or under for now
  "elementType":"Textinput",
  // numCols
  // align
},{
  "elementName":"lastName",
  "elementHeader":"",
  "placeholder":"Last Name",
  "placeholderPosition":"hint",
  "elementType":"Textinput",
}
]

function GenerateRow(props) {
  const [Textin , setTextin] = useState({});

  useEffect(() => {
    const newElements = {};
    for(let i=0; i<info.length; i++){
      const element = info[i];
      if (element["elementType"] === "Textinput" && !(element["elementName"] in Textin)) {
        newElements[element["elementName"]] = "";
        setTextin(prevState => ({
          ...prevState,
          ...newElements
        }));
      }
    }
  }, [Textin]);

  const handleTextinChange = e => {
    const {name , value} = e.target;
    setTextin(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const to_return = [];
  var false_header=false;
  console.log(Textin)
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

      const text = Textin[element["elementName"]] || "";
      to_return.push(
        <TextInput
          title={element["elementHeader"]}
          hint={element["placeholder"]}
          hintPosition={element["placeholderPosition"]}
          size={dimensions}
          name={element["elementName"]}
          false_header={false_header}
          onChange={handleTextinChange}
          text={Textin[element["elementName"]]}
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