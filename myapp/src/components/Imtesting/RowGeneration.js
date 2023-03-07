import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';

function GenerateRow(props) {
  const [checkboxData, setCheckboxData] = useState({});

  var info = props.info;

  useEffect(() => {
    const newElements = {};
    for (let i = 0; i < info.length; i++) {
      const element = info[i];
      if (element["elementType"] === "Textinput" && !(element["elementName"] in props.Data)) {
        newElements[element["elementName"]] = "";
        props.onChange(prevState => ({
          ...prevState,
          ...newElements
        }));
      } else if (element["elementType"] === "Checkbox") {
        const options = element["options"];
        for (let j = 0; j < options.length; j++) {
          const option = options[j];
          if (option["optionType"] === "checkbox-text" && !(option["optionValue"] in checkboxData)) {
            setCheckboxData(prevState => ({
              ...prevState,
              [option["optionValue"]]: ""
            }));
          }
        }
      }
    }
  }, [props.Data]);

  const handleTextinChange = e => {
    const { name, value } = e.target;
    props.onChange(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, type, text) => {
    setCheckboxData(prevState => ({
      ...prevState,
      [name]: {
        type: type,
        text: text
      }
    }));
  };

  const to_return = [];
  var false_header = false;

  for (let i = 0; i < info.length; i++) {
    const element = info[i];
    const inputType = element["elementType"];
    if ("size" in element) {
      var dimensions = parseInt(element["size"]);
    } else {
      var dimensions = 12 / info.length;
    }
    if (inputType === "Textinput") {
      if (i > 0 && info[0]["elementHeader"].length > 0) {
        false_header = true;
      }
      const text = props.Data[element["elementName"]] || "";
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
    } else if (inputType === "Checkbox") {
      if (i > 0 && info[0]["elementHeader"].length > 0) {
        false_header = true;
      }
      const options = element["options"];
      to_return.push(
        <Checkbox
          options={options}
          title={element["elementHeader"]}
          size={dimensions}
          name={element["elementName"]}
          false_header={false_header}
          orientation={element["elementOrientation"]}
          onChange={handleCheckboxChange}
        />
      );
    }
  }

  return <div className="row">{to_return}</div>;
}

export default GenerateRow;
