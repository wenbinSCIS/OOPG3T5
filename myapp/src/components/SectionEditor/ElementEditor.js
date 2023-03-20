import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const ElementEditor = ({ onPressedElement }) => {
  const [elementType, setElementType] = useState(null); // element type

  const [overallRowState, setOverallRowState] = useState([]);

  const [rowState, setRowState] = useState([]);

  const [elementState, setElementState] = useState({});

  const [optionState, setOptionState] = useState({}); // this is for elements who have the ability to select options, for example dropdowns, checkboxes, etc, will be a dictionary initially then converted to a list

  // need to add save and close button in addition to add element

  /*
=============================================================================================
The code below manages the state for creating a new row or adding an element to an existing row (the first dropdown)

It also manages the state for selecting and existing row by checking the row number that is returned

handleNewRowAddElement: sets the elementType value as the one that we have selected
=============================================================================================
*/
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const handleNewRowAddElement = (e) => {
    setSelectedOption(e.target.value);
    console.log("The user chooses to: ", e.target.value);
    setSelectedRow(null); // so that the state from handling target row does not persist
    setElementType(null);
  };

  const handleTargetRow = (e) => {
    let selectedRowNumber;
    if (e.target.value === "Choose a Row") {
      selectedRowNumber = e.target.value;
    } else {
      selectedRowNumber = parseInt(e.target.value, 10);
    }
    setSelectedRow(selectedRowNumber);
    setElementType(null);
    console.log("The user selects row: ", e.target.value);
  };

  /*
=============================================================================================
The code below manages the state for element type, 

handleChange: sets the elementType value as the one that we have selected
=============================================================================================
*/
  useEffect(
    () => console.log("The element State is: ", elementState),
    [elementState]
  ); // add this to log all changes to elementState

  useEffect(() => console.log("The row state is: ", rowState), [rowState]);

  useEffect(
    () => console.log("The overall row state is: ", overallRowState),
    [overallRowState]
  );

  const handleChange = (event) => {
    setElementType(event.target.value);

    setNumOptionsHeaders(3); // the reason why I do this is because everytime I rotate between headers/options I would like the 3 headers /options to be displayed only

    setOptionState({}); // want to revert option state everytime we select a new element

    setOptionTypeList([]); // want to revert the option type chosen for radio, dropdown and checbox back to default, both normal and text are configured differently

    let chosenElementType = event.target.value;

    setRowState([]); // I want individual row state to change when I select a different option - may have to adjust this

    // have to set the default values for individual data types
    setElementState({ elementType: chosenElementType });

    if (chosenElementType === "Text") {
      setElementState({ elementType: chosenElementType, textSize: "12" });
    }

    if (chosenElementType === "Textarea") {
      setElementState({ elementType: chosenElementType, elementHeader: "" });
    }

    if (chosenElementType === "Textinput") {
      setElementState({
        elementType: chosenElementType,
        elementHeader: "",
        placeholderPosition: "hint",
      });
    }

    if (chosenElementType === "Dropdown") {
      setElementState({
        elementType: chosenElementType,
        elementHeader: "",
        size: "4",
      });
    }

    if (chosenElementType === "Radio") {
      setElementState({
        elementType: chosenElementType,
        elementHeader: "",
        elementOrientation: "horizontal",
      });
    }

    if (chosenElementType === "Checkbox") {
      setElementState({
        elementType: chosenElementType,
        elementHeader: "",
        elementOrientation: "horizontal",
      });
    }

    if (chosenElementType === "Table") {
      setElementState({
        elementType: chosenElementType,
        elementHeader: "",
        noRows: "5",
        noColumns: "",
      });
    }

    // if I do not do as above the number of options and the default value shown will not be consistent
  };

  // This function handles changes when admin edits parameters on the form

  const handleInputChange = (event, isOption = false, eKey = "options") => {
    // I need to add additonal logic if isOption == True, this includes updating the option State
    if (!isOption) {
      const { id, value } = event.target;
      setElementState((elementState) => ({
        ...elementState,
        [id]: value,
      }));
    } else {
      const selectedIndex = parseInt(event.target.id, 10);
      const { value } = event.target;
      const updatedOptionState = { ...optionState, [selectedIndex]: value }; // I need the updated OptionState because updated the current state there is some lag
      setOptionState((optionState) => ({
        ...optionState,
        [selectedIndex]: value,
      }));

      // now I need to get a list of the values provided by options in order from 1 to the last index, so I need to sort first
      const myList = Object.keys(updatedOptionState)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // smaller index over bigger index
        .map((key) => updatedOptionState[key]);

      setElementState((elementState) => ({
        ...elementState,
        [eKey]: myList, // the default value of key is options from the parameter, but it will have to be changed to headers if Table is selected
      }));
    }
  };

  const handleInputChangeImproved = (
    event,
    isOption = false,
    isHeader = false,
    eKey = "options",
    index = null
  ) => {
    // I need to add additonal logic if isOption == True, this includes updating the option State
    if (!isOption && !isHeader) {
      const { id, value } = event.target;
      setElementState((elementState) => ({
        ...elementState,
        [id]: value,
      }));
    } else if (isHeader) {
      const selectedIndex = parseInt(event.target.id, 10);
      const { value } = event.target;
      const updatedOptionState = { ...optionState, [selectedIndex]: value }; // I need the updated OptionState because updated the current state there is some lag
      setOptionState((optionState) => ({
        ...optionState,
        [selectedIndex]: value,
      }));

      // now I need to get a list of the values provided by options in order from 1 to the last index, so I need to sort first
      const myList = Object.keys(updatedOptionState)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // smaller index over bigger index
        .map((key) => updatedOptionState[key]);

      setElementState((elementState) => ({
        ...elementState,
        [eKey]: myList, // the default value of key is options from the parameter, but it will have to be changed to headers if Table is selected
      }));
    } else if (isOption) {
      const { id, value } = event.target;
      console.log(id, value, index);
      const updatedOptionState = { ...optionState };
      let optionObject = {};

      if (index in updatedOptionState) { // basically if it already exi
        optionObject = { ...updatedOptionState[index] };
      }
      if (id == "optionName") {
        optionObject[id] = value;
        optionObject["optionValue"] = value;
        if (elementState.elementType == "Dropdown") {
          optionObject["optionType"] = "Dropdown";
        }
      } else {
        // text variables is a nested dict for each option
        optionObject.textVariables[id] = value;
      }

      updatedOptionState[index] = optionObject;
      console.log(updatedOptionState);
      setOptionState(updatedOptionState);

      const myList = Object.keys(updatedOptionState)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // smaller index over bigger index
        .map((key) => updatedOptionState[key]);

      setElementState((elementState) => ({
        ...elementState,
        [eKey]: myList, // the default value of key is options from the parameter, but it will have to be changed to headers if Table is selected
      }));
    }
  };

  /*
=============================================================================================
The code below manages the state for the Dropdown,Radio,Checkbox and Table elements

numOptionsHeaders: How many headers/options we want

handleOptionsHeadersSelect: takes the input from the elements and sets the numOptionsHeaders accordingly

renderOptionsHeaders: renders the options/headers on the front end
=============================================================================================
*/
  const [numOptionsHeaders, setNumOptionsHeaders] = useState(3); // dropdown select, default number of options is 3

  const handleOptionsHeadersSelect = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setNumOptionsHeaders(selectedValue);
  };

  function renderOptionsHeaders(elementKey = "options", label = "Option") {
    // elementKey is either options or headers, but can be expanded. Label for now just Header or Option.
    // this will be only used for tables and dropdown, this is because the dropdown json formating follows that of radio and checkbox but on the fe it makes more sense to follow the table formatting
    // to circumvent we set the control id if options is the element key to option Name and handleInputChangeImproved as IsOption == true, it should work

    const optionsOrHeaders = [];
    if (elementKey == "headers") {
      for (let i = 0; i < numOptionsHeaders; i++) {
        optionsOrHeaders.push(
          <Form.Group key={i} controlId={i} style={{ width: "50%" }}>
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              {label} {i + 1}
            </Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(event) =>
                handleInputChangeImproved(event, false, true, elementKey)
              }
            />
          </Form.Group>
        );
      }
    } else {
      for (let i = 0; i < numOptionsHeaders; i++) {
        optionsOrHeaders.push(
          <Form.Group key={i} controlId="optionName" style={{ width: "50%" }}>
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              {label} {i + 1}
            </Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(event) =>
                handleInputChangeImproved(event, true, false, elementKey, i)
              }
            />
          </Form.Group>
        );
      }
    }

    return optionsOrHeaders;
  }

  /* we are updating the rending function from here onwards (WIP) */

  const [optionTypeList, setOptionTypeList] = useState([]); // Controls what is currently seen for the user in the dropdown for each option

  const handleOptionsSelect = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log(selectedValue);
    setNumOptionsHeaders(selectedValue);

    const tempOptionTypeList = [...optionTypeList];
    if (tempOptionTypeList.length > selectedValue) {
      // what am I doing here? I want to remove option types in the list if the person changes the number of checkbox values to a smaller one, that way the excess data will be trimmed off
      tempOptionTypeList.splice(selectedValue);
    } // I need to add this to the onchange of selecting the number of checkbox values, if not it won't work.

    const tempOptionState = { ...optionState };

    const newOptionState = {};

    const compareValue = selectedValue - 1; // basically we want to compare value to remove any residual options from the option state beyond the number of options selected. i,e if I filled out option 6 but now I only want 3 options, I will remove option 6

    for (const [key, value] of Object.entries(tempOptionState)) {
      if (key <= compareValue) {
        newOptionState[key] = value;
      }
    }

    setOptionTypeList(tempOptionTypeList);
    setOptionState(newOptionState);
    // console.log(tempOptionTypeList);
  };

  function renderOptions(elementKey = "options", label = "Option") {
    // elementKey is either options or headers, but can be expanded. Label for now just Header or Option, need to pass elementKey into ekey in handleOptionChange
    const optionsOrHeaders = [];

    const tempOptionTypeList = [...optionTypeList];

    for (let i = 0; i < numOptionsHeaders; i++) {
      // basically Im just adding more element type = null if the user picks a larger checkbox value
      if (tempOptionTypeList.length - 1 >= i) {
      } else {
        tempOptionTypeList.push(null);
      }
    }

    for (let i = 0; i < numOptionsHeaders; i++) {
      optionsOrHeaders.push(
        <div className="d-flex">
          <div className="me-3">
            <Form.Group key={i} controlId={i}>
              <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                {label} {i + 1} type
              </Form.Label>
              <Form.Select
                // style={{ width: "32%" }}
                className="custom-select mb-3"
                value={tempOptionTypeList[i] ?? "Choose a Type"}
                onChange={(event) =>
                  handleTypeChosen(event, tempOptionTypeList)
                }
              >
                <option key="Not an Option" value="Choose a Type">
                  Choose a Type
                </option>
                <option key="Normal" value="Normal">
                  Normal
                </option>
                <option key="Text" value="Text">
                  Text
                </option>
              </Form.Select>
            </Form.Group>
          </div>
          {tempOptionTypeList[i] == "Normal" && (
            <div>
              <Form.Group controlId="optionName">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                  Option Value
                </Form.Label>
                <Form.Control
                  // style={{ width: "70%" }}
                  type="text"
                  // className="mb-3"
                  placeholder="Option Value"
                  onChange={(event) =>
                    handleInputChangeImproved(event, true, false, elementKey, i)
                  }
                />
              </Form.Group>
            </div>
          )}
          {tempOptionTypeList[i] == "Text" && (
            <>
              <div className="me-3">
                <Form.Group controlId="optionName">
                  <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                    Option Value
                  </Form.Label>
                  <Form.Control
                    // style={{ width: "70%", margin: 0 }}
                    type="text"
                    className="mb-3"
                    placeholder="Option Value"
                    onChange={(event) =>
                      handleInputChangeImproved(
                        event,
                        true,
                        false,
                        elementKey,
                        i
                      )
                    }
                  />
                </Form.Group>
              </div>

              <div className="me-3">
                <Form.Group controlId="hintPosition">
                  <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                    Hint Position (Optional)
                  </Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      handleInputChangeImproved(
                        event,
                        true,
                        false,
                        elementKey,
                        i
                      )
                    }
                    defaultValue="front"
                  >
                    <option value="hint">Hint (Within Text Input)</option>
                    <option value="under">Under (Below Text Input)</option>
                    <option value="front">
                      Front (At the left of Text Input)
                    </option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="me-3">
                <Form.Group controlId="hintText">
                  <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                    Hint Text
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Hint Text"
                    onChange={(event) =>
                      handleInputChangeImproved(
                        event,
                        true,
                        false,
                        elementKey,
                        i
                      )
                    }
                  />
                </Form.Group>
              </div>
              <div className="me-3">
                <Form.Group controlId="header">
                  <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                    Header Value (optional)
                  </Form.Label>
                  <Form.Control
                    // style={{ width: "80%", margin: 0 }}
                    type="text"
                    className="mb-3"
                    placeholder="Header Value"
                    onChange={(event) =>
                      handleInputChangeImproved(
                        event,
                        true,
                        false,
                        elementKey,
                        i
                      )
                    }
                  />
                </Form.Group>
              </div>
            </>
          )}
        </div>
      );
    }

    return optionsOrHeaders;
  }

  const handleTypeChosen = (event, headersList) => {
    const { id, value } = event.target; // id in this case refers to the current index of the option
    let newValue = "";
    if (elementState.elementType == "Checkbox") {
      if (value == "Normal") {
        newValue = "Checkbox";
      } else {
        newValue = "Checkbox-text";
      }
    }
    if (elementState.elementType == "Radio") {
      if (value == "Normal") {
        newValue = "Radio";
      } else {
        newValue = "radio-text";
      }
    }
    // if (elementState.elementType == "Dropdown") { // not triggering handle type chosen that's why this is irrelevant
    //   if (value == "Normal") {
    //     newValue = "Dropdown";
    //   } else {
    //     newValue = "Dropdown-text";
    //   }
    // }

    const updatedOptionTypeList = [...headersList];
    if (value == "Choose a Type") {
      updatedOptionTypeList[id] = null; // want it to be null for consistency
    } else {
      updatedOptionTypeList[id] = value;
    }
    setOptionTypeList(updatedOptionTypeList); // updated the new value of the setoptionType list

    const updatedOptionState = { ...optionState };
    if (value == "Normal") {
      updatedOptionState[id] = { optionType: newValue };
    } else if (value == "Text") {
      updatedOptionState[id] = {
        optionType: newValue,
        textVariables: { hintPosition: "front", header: "" },
      }; // need to add tested structure for text variables
    } else {
      delete updatedOptionState[id]; // I don't want to leave it inside if "Choose a Type" is selected again needs to be omitted
    }
    // }
    setOptionState(updatedOptionState);
    console.log(updatedOptionState);
  };

  // const handleOptionChange = (event, index, eKey = "options") => {
  //   const { id, value } = event.target;
  //   const updatedOptionState = { ...optionState };
  //   if (index in updatedOptionState) {
  //     const optionObject = { ...updatedOptionState[index] };
  //     if (id == "optionName") {
  //       optionObject[id] = value;
  //       optionObject["optionValue"] = value;
  //     } else {
  //       // text variables is a nested dict for each option
  //       optionObject.textVariables[id] = value;
  //     }
  //     updatedOptionState[index] = optionObject;
  //   }

  //   setOptionState(updatedOptionState);

  //   const myList = Object.keys(updatedOptionState)
  //     .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // smaller index over bigger index
  //     .map((key) => updatedOptionState[key]);

  //   setElementState((elementState) => ({
  //     ...elementState,
  //     [eKey]: myList, // the default value of key is options from the parameter, but it will have to be changed to headers if Table is selected
  //   }));
  // };

  /*
=============================================================================================
The code below manages the submission of the event

(if row being added is new)
addItem: Helper function to allow us to add new element to the current row

handleRowState: updates current state of the row being added

handleOverallRowState: updates current state of all the section by appending new row

(if element is being added to an existing row)
appendToOverallState: appends element to selected row as chosen by the user
=============================================================================================
*/

  function addItem(currentList, newItem) {
    return [...currentList, newItem];
  }

  const handleRowState = () => {
    const updatedRowState = [...rowState, elementState];
    setRowState((rowState) => addItem(rowState, elementState));
    handleOverallRowState(updatedRowState);
  };

  const handleOverallRowState = (updatedState) => {
    const updatedOverallState = [...overallRowState, updatedState]; // updatedOverallState should be sent over to the overallRowState -> takes a while to update
    setOverallRowState((overallRowState) =>
      addItem(overallRowState, updatedState)
    );
    // console.log(updatedOverallState); // this should be pushed to the admin page
  };

  const appendToOverallRowState = () => {
    const currentRowState = [...overallRowState]; // create a new copy of the state
    const rowIndex = selectedRow - 1; // index of the row you want to append to
    const row = [...currentRowState[rowIndex]]; // create a new copy of the row
    row.push(elementState); // append the new element to the row
    currentRowState[rowIndex] = row; // replace the old row with the new one
    setOverallRowState(currentRowState);
    // console.log(currentRowState); // should be pushed to admin
  };

  function handleEventSubmission() {
    let elementIsGood = false;

    if (
      elementState.elementType == "Text" &&
      "elementName" in elementState &&
      "Text" in elementState
    ) {
      elementIsGood = true;
      console.log("you are good!");
    }

    if (
      elementState.elementType == "Textinput" &&
      "elementName" in elementState &&
      "placeholder" in elementState
    ) {
      elementIsGood = true;
      console.log("you are good!");
    }

    if (
      elementState.elementType == "Textarea" &&
      "elementName" in elementState
    ) {
      elementIsGood = true;
      console.log("you are good!");
    }

    if (
      (elementState.elementType == "Dropdown" ||
        elementState.elementType == "Checkbox" ||
        elementState.elementType == "Radio") &&
      "elementName" in elementState &&
      "options" in elementState
    ) {
      elementIsGood = true;
      console.log("you are good!");
    }

    if (
      elementState.elementType == "Table" &&
      "elementName" in elementState &&
      "headers" in elementState
    ) {
      elementIsGood = true;
      console.log("you are good!");
    }

    if (elementIsGood) {
      try {
        if (selectedOption === "new row") {
          //basically we can just do normal functions like append to a new row behind
          handleRowState();
        } else {
          appendToOverallRowState();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please fill up empty element editor fields!");
    }
  }

  function handleSubmissiontoAdmin() {
    onPressedElement(overallRowState); // same as retrieve elements from section editor
    console.log("Element Editor sends data to Section Editor");
  }

  /*
=============================================================================================
Code to be Deprecated
=============================================================================================
*/

  // none for now

  /*
=============================================================================================
Returned Component
=============================================================================================
*/

  return (
    <Form>
      <h5>Element Editor</h5>
      <Form.Group controlId="newRowOrAddElement" className="mb-3">
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Create new row or add an element to an existing row?
        </Form.Label>
        <Form.Check
          type="radio"
          label="Create new row"
          value="new row"
          checked={selectedOption === "new row"}
          onChange={handleNewRowAddElement}
        />
        {overallRowState.length > 0 && ( // I check overallrowstate length so if there are no exising rows I will not produce this element
          <Form.Check
            type="radio"
            label="Add an element to an existing row"
            value="add element"
            checked={selectedOption === "add element"}
            onChange={handleNewRowAddElement}
          />
        )}
      </Form.Group>
      {selectedOption === "add element" && (
        <Form.Group controlId="row number">
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Select Row Number
          </Form.Label>
          <Form.Select
            style={{ width: "32%" }}
            className="custom-select mb-3"
            defaultValue="Choose a Row"
            onChange={handleTargetRow}
          >
            <option key="Choose a Row" value="Choose a Row">
              Choose a Row
            </option>
            {Array.from({ length: overallRowState.length }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}
      {selectedOption === "new row" ||
      (selectedOption === "add element" &&
        selectedRow != "Choose a Row" &&
        selectedRow != null) ? (
        <Form.Group controlId="elementType">
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Select Type of Element
          </Form.Label>
          <Form.Select
            style={{ width: "32%" }}
            className="custom-select mb-3"
            value={elementType ?? "Choose an Element"} // so this is for the selected option == new row, if change from add new element to create new row, the value shown on element selector will revert back to Choose and element rather than remaining the same
            onChange={handleChange}
          >
            <option key="Not an Option" value="Choose an Element">
              Choose an Element
            </option>
            <option key="Text" value="Text">
              Text
            </option>
            <option key="Textinput" value="Textinput">
              Text Input
            </option>
            <option key="Textarea" value="Textarea">
              Text Area
            </option>
            <option key="Dropdown" value="Dropdown">
              Dropdown
            </option>
            <option key="Radio" value="Radio">
              Radio
            </option>
            <option key="Checkbox" value="Checkbox">
              Checkbox
            </option>
            <option key="Table" value="Table">
              Table
            </option>
          </Form.Select>
        </Form.Group>
      ) : null}
      {elementType === "Text" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="Text" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Text
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Text that you want to display"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group
            controlId="textSize"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Text Size (Optional)
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="12"
              onChange={(event) => handleInputChangeImproved(event)}
            >
              {Array.from({ length: 24 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </>
      )}
      {elementType === "Textarea" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              e
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Text Area)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
        </>
      )}
      {elementType === "Textinput" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Text Input)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="placeholder" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Placeholder Text
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert placeholder text"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group
            controlId="placeholderPosition"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Placeholder position
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => handleInputChangeImproved(event)}
            >
              <option value="hint">Hint (Within Text Input)</option>
              <option value="under">Under (Below Text Input)</option>
              <option value="front">Front (At the left of Text Input)</option>
            </Form.Select>
          </Form.Group>
        </>
      )}
      {elementType === "Dropdown" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Insert Element Header (To be displayed above DropDown)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group
            controlId="size"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Width of DropDown (Optional)
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="4"
              onChange={(event) => handleInputChangeImproved(event)}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group
            controlId="options"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Select Number of Options
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="3"
              onChange={handleOptionsHeadersSelect}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {renderOptionsHeaders()}
        </>
      )}

      {elementType === "Radio" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Radio)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementOrientation" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Orientation
            </Form.Label>
            <Form.Select
              aria-label="Element Orientation"
              onChange={(event) => handleInputChangeImproved(event)}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            controlId="options"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Select Number of Options
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="3"
              onChange={handleOptionsSelect}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {renderOptions()}
        </>
      )}
      {elementType === "Checkbox" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Checkbox)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementOrientation" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Orientation
            </Form.Label>
            <Form.Select
              aria-label="Element Orientation"
              onChange={(event) => handleInputChangeImproved(event)}
            >
              <option value="Horizontal">Horizontal</option>
              <option value="Vertical">Vertical</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            controlId="options"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Select Number of Checkbox Values
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="3"
              onChange={handleOptionsSelect}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {renderOptions()}
        </>
      )}
      {elementType === "Table" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header (Optional)
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Checkbox)"
              onChange={(event) => handleInputChangeImproved(event)}
            />
          </Form.Group>
          <Form.Group
            controlId="noRows"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Select Number of Rows
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="5"
              onChange={(event) => handleInputChangeImproved(event)}
            >
              {Array.from({ length: 20 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group
            controlId="headers"
            className="mb-3"
            style={{ width: "32%" }}
          >
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Select Number of Headers / Columns
            </Form.Label>
            <Form.Select
              className="custom-select"
              defaultValue="3"
              onChange={handleOptionsHeadersSelect}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {renderOptionsHeaders("headers", "Header")}
        </>
      )}
      {elementType && elementType != "Choose an Element" && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              alignItems="center"
              variant="contained"
              color="primary"
              onClick={handleEventSubmission}
              sx={{ marginBottom: "1rem" }}
            >
              Save Element&nbsp;&nbsp;
              <SendIcon />
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              alignItems="center"
              variant="contained"
              color="success"
              // type="submit" // no longer submit
              onClick={handleSubmissiontoAdmin}
            >
              Save Section&nbsp;&nbsp;
              <SendIcon />
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default ElementEditor;
