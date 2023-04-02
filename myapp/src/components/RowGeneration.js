import React, { useState, useEffect } from "react";
import TextInput from "./FillComponents/TextInput";
import Checkbox from "./FillComponents/Checkbox";
import Radio from "./FillComponents/Radio";
import Dropdown from "./FillComponents/DropdownSelect";
import Textarea from "./FillComponents/Textarea";
import TableComponent from "./FillComponents/Table";
import Text from "./FillComponents/Text";

// styling up for AdminCreation
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

function GenerateRow(props) {
  var info = props.info;
  var allData = props.allData; //useState prop from main
  var setallData = props.setallData; //setState prop from main

  useEffect(() => {
    const newElements = {};
    for (let i = 0; i < info.length; i++) {
      const element = info[i];
      if (
        (element["elementType"] === "Textinput" ||
          element["elementType"] === "Dropdown") &&
        !(element["elementName"] in allData)
      ) {
        newElements[element["elementName"]] = "";
        setallData((prevState) => ({
          ...prevState,
          ...newElements,
        }));
      } else if (
        element["elementType"] === "Table" &&
        !(element["elementName"] in allData)
      ) {
        newElements[element["elementName"]] = Array.from(
          { length: element["noRows"] },
          () => ({})
        );
        setallData((prevState) => ({
          ...prevState,
          ...newElements,
        }));
      }
    }
  }, [allData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setallData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleValueChange = (elementName, value) => {
    setallData((prevState) => ({
      ...prevState,
      [elementName]: value,
    }));
  };

  const handleTableChange = (event, rowIndex, column, key) => {
    const { value } = event.target;
    setallData((prevData) => {
      return {
        ...prevData,
        [key]: prevData[key].map((row, index) => {
          if (index === rowIndex) {
            return { ...row, [column]: value };
          } else {
            return row;
          }
        }),
      };
    });
  };
  const to_return = [];
  var false_header = false;
  for (let i = 0; i < info.length; i++) {
    const element = info[i];
    const inputType = element["elementType"];
    if (
      ("size" in element && element["size"] != null) ||
      element["size"] != undefined
    ) {
      var dimensions = parseInt(element["size"]);
    } else {
      var dimensions = 12 / info.length;
    }

    if (inputType === "Textinput") {
      if (i > 0 && info[0]["elementHeader"].length > 0) {
        false_header = true;
      }
      var text = "";
      if (allData[element["elementName"]] !== undefined) {
        text = allData[element["elementName"]];
      }
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
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
          fillFor={props.fillFor}
        />
      );
    }
    //dropdown here
    else if (inputType == "Dropdown") {
      if (i > 0 && info[0]["elementHeader"].length > 0) {
        var false_header = true;
      }
      to_return.push(
        <Dropdown
          data={allData[element["elementName"]]}
          title={element["elementHeader"]}
          options={element["options"]}
          size={dimensions}
          name={element["elementName"]}
          false_header={false_header}
          onChange={handleInputChange}
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
          fillFor={props.fillFor}
        ></Dropdown>
      );
    }
    //checkbox
    else if (inputType == "Checkbox") {
      if (i > 0 && info[0]["elementHeader"].length > 0) {
        var false_header = true;
      }
      to_return.push(
        <Checkbox
          data={allData[element["elementName"]]}
          title={element["elementHeader"]}
          options={element["options"]}
          size={dimensions}
          name={element["elementName"]}
          false_header={false_header}
          orientation={element["elementOrientation"]}
          onChange={handleValueChange}
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
          fillFor={props.fillFor}
        ></Checkbox>
      );
    }
    //radio
    else if (inputType == "Radio") {
      to_return.push(
        <Radio
          data={allData[element["elementName"]]}
          title={element["elementHeader"]}
          options={element["options"]}
          size={dimensions}
          name={element["elementName"]}
          orientation={element["elementOrientation"]}
          onChange={handleValueChange}
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
          fillFor={props.fillFor}
        ></Radio>
      );
    }
    //textarea
    else if (inputType == "Textarea") {
      const text = allData[element["elementName"]] || "";
      if (i > 0 && info[0]["elementHeader"].length > 0) {
        var false_header = true;
      }
      to_return.push(
        <Textarea
          title={element["elementHeader"]}
          hint={element["placeholder"]}
          hintPosition={element["placeholderPosition"]}
          size={dimensions}
          name={element["elementName"]}
          false_header={false_header}
          onChange={handleInputChange}
          text={text}
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
          fillFor={props.fillFor}
        ></Textarea>
      );
    }
    //table
    else if (inputType == "Table") {
      to_return.push(
        <TableComponent
          columnHeaders={element["headers"]}
          size={dimensions}
          name={element["elementName"]}
          columns={element["noColumns"]}
          rows={element["noRows"]}
          onChange={handleTableChange}
          data={allData[element["elementName"]]}
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
          fillFor={props.fillFor}
        ></TableComponent>
      );
    }
    //text
    else if (inputType == "Text") {
      to_return.push(
        <Text
          size={dimensions}
          name={element["elementName"]}
          textSize={element["textSize"]}
          text={element["placeholder"]}
          alignment={element["alignment"]}
          generateFor={props.generateFor}
          handleDelete={props.handleDelete}
        ></Text>
      );
    }
  }

  const handleMoveUp = (index) => {
    props.MoveUp(index);
    props.MoveUpSG(index);
  };

  const handleMoveDown = (index) => {
    props.MoveDown(index);
    props.MoveDownSG(index);
  };

  return (
    <div className="row">
      {props.generateFor === "AdminCreation" && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ justifyContent: "flex-end" }}
        >
          <IconButton onClick={() => handleMoveDown(props.index)}>
            <ExpandCircleDownIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => handleMoveUp(props.index)}>
            <ExpandCircleDownIcon
              fontSize="large"
              sx={{ transform: "rotate(180deg)" }}
            />
          </IconButton>
          <Button
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            disabled={true}
            // startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            // onClick={Delete}
          >
            <HighlightOffIcon />
            &nbsp;Remove
          </Button>
        </Stack>
      )}
      {to_return}
      {props.generateFor === "AdminCreation" && <hr></hr>}
    </div>
  );
}

export default GenerateRow;
