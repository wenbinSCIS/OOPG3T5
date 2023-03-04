import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const ElementEditor = ({ sectionHeader, onPressedElement }) => {
  const [elementType, setElementType] = useState(""); // element type

  const [overallRowState, setOverallRowState] = useState([]);

  const [rowState, setRowState] = useState([]);

  const [elementState, setElementState] = useState({});

  const [optionState, setOptionState] = useState({}); // this is for elements who have the ability to select options, for example dropdowns, checkboxes, etc, will be a dictionary initially then converted to a list

  // I need a state for all the form elements, empty list
  // for each new row I need to
  // I need to add default states for each variable -> need default parameters then when I press change setOption then add them to the particular row element
  //for the dropdown and checkbox I would need additional states
  // need to add save and close button in addition to add element

  /*
=============================================================================================
The code below manages the state for element type, 

handleChange: sets the elemeType value as the one that we have selected
=============================================================================================
*/
  useEffect(
    () => console.log("The element State is: ", elementState),
    [elementState]
  ); // add this to log all changes to elementState

  useEffect(() => console.log("The row state is: ", rowState), [rowState]);

  useEffect(() => console.log("The overall row state is: ", overallRowState), [overallRowState]);

  // const currentElementState = useRef(elementState);

  // useEffect(() =>
  //   console.log(currentElementState.current), [elementState]);
  // add this to log all changes to elementState

  /* I need the userRef to define a mutable reference currentElementState using the userRef hook, and initialize it with the current value of elementState
  
  we then define an effect hook that logs the urrent value of elementState every time it changes using console.log. instead of logging the current value of elementState, we log the current value of elementState.current, which will always containe the latest value of elementState even if it contains a reference to optionsState
  */

  const handleChange = (event) => {
    setElementType(event.target.value);
    setNumOptions(3); // the reason why I do this is because everytime I rotate between options I would like only 3 option to be displayed only
    setNumRadioOptions(3); // the reason why I do this is because everytime I rotate between options I would like the 3 options to be displayed only
    setNumCheckboxOptions(3); // the reason why I do this is because everytime I rotate between options I would like the 3 options to be displayed only
    setOptionState({}); // want to revert option state everytime we select a new element

    let chosenElementType = event.target.value;

    setRowState([]); // I want individual row state to change when I select a different option - may have to adjust this
    setElementState({ elementType: chosenElementType });

    // if I do not do as above the number of options and the default value shown will not be consistent
  };

  // This function handles changes when admin edits parameters on the form

  const handleInputChange = (event, isOption) => {
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
      setOptionState((optionState) => ({
        ...optionState,
        [selectedIndex]: value,
      }));

      // now I need to get a list of the values provided by options in order from 1 to the last index, so I need to sort first
      const myList = Object.keys(optionState)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .map((key) => optionState[key]);

      setElementState((elementState) => ({
        ...elementState,
        options: myList,
      }));
    }
  };

  /*
=============================================================================================
The code below manages the state for the dropdown select option, 

numOptions: How many options we want

handleDropDownSelect: takes the input from the dropdown and Sets the numpOptions accordingly

renderOptions: renders the options on the front end
=============================================================================================
*/

  const [numOptions, setNumOptions] = useState(3); // dropdown select, default number of options is 3

  const handleDropdownSelect = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setNumOptions(selectedValue);
  };

  function renderOptions() {
    const options = [];

    for (let i = 0; i < numOptions; i++) {
      options.push(
        <Form.Group key={i} controlId={i} style={{ width: "50%" }}>
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Option {i + 1}
          </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(event) => handleInputChange(event, true)}
          />
        </Form.Group>
      );
    }

    return options;
  }

  /*
=============================================================================================
The code below manages the state for the radio, 

numRadioOptions: How many options we want

handleRadioSelect: takes the input from the radio and sets the numpRadioOptions accordingly

renderRadioOptions: renders the options on the front end
=============================================================================================
*/
  const [numRadioOptions, setNumRadioOptions] = useState(3); // dropdown select, default number of options is 3

  const handleRadioSelect = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setNumRadioOptions(selectedValue);
  };

  function renderRadioOptions() {
    const options = [];

    for (let i = 0; i < numRadioOptions; i++) {
      options.push(
        <Form.Group key={i} controlId={i} style={{ width: "50%" }}>
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Option {i + 1}
          </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(event) => handleInputChange(event, true)}
          />
        </Form.Group>
      );
    }

    return options;
  }

  /*
=============================================================================================
The code below manages the state for the checkbox, 

numCheckboxOptions: How many options we want

handleCheckboxSelect: takes the input from the checkbox and sets the numCheckboxOptions accordingly

renderCheckboxOptions: renders the options on the front end
=============================================================================================
*/
  const [numCheckboxOptions, setNumCheckboxOptions] = useState(3); // dropdown select, default number of options is 3

  const handleCheckboxSelect = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setNumCheckboxOptions(selectedValue);
  };

  function renderCheckboxOptions() {
    const options = [];

    for (let i = 0; i < numCheckboxOptions; i++) {
      options.push(
        <Form.Group key={i} controlId={i} style={{ width: "50%" }}>
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Value {i + 1}
          </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(event) => handleInputChange(event, true)}
          />
        </Form.Group>
      );
    }

    return options;
  }
  /*
=============================================================================================
The code below manages the submission of the event
=============================================================================================
*/

  function addItem(currentList, newItem) {
    return [...currentList, newItem];
  }

  const handleRowState = () => {
    setRowState((rowState) => addItem(rowState, elementState));
  };

  const handleOverallRowState = () => {
    setOverallRowState((overallRowState) => addItem(overallRowState, rowState));
  };

  function handleEventSubmission() {
    try {
      handleRowState();
      handleOverallRowState();
    } catch (error) {
      console.error(error);
    }
  }

  // const handleEventSubmission = () => {
  //   handleRowState();
  //   console.log(overallRowState);
  // };

  // const handleRowState = () => {
  //   setRowState((rowState) => ({
  //     ...rowState,
  //     elementState,
  //   }));
  //   handleOverallRowState();
  // };

  // const handleOverallRowState = () => {
  //   setOverallRowState((overallRowState) => ({
  //     ...overallRowState,
  //     rowState,
  //   }));
  // };

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
    <Form onSubmit={onPressedElement}>
      <h5>Element Editor</h5>
      <Form.Group controlId="elementType">
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Select Type of Element
        </Form.Label>
        <Form.Select
          style={{ width: "32%" }}
          className="custom-select mb-3"
          defaultValue="Choose an Element"
          onChange={handleChange}
        >
          <option key="Not an Option" value="Choose an Element">
            Choose an Element
          </option>
          <option key="Text" value="Text">
            Text
          </option>
          <option key="Textinput" value="Text Input">
            Text Input
          </option>
          <option key="Textarea" value="Text Area">
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
          <option key="TableComponent" value="Table">
            Table
          </option>
        </Form.Select>
      </Form.Group>
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
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={(event) => handleInputChange(event, false)}
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
      {elementType === "Text Area" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header
            </Form.Label>
            <Form.Control
              type="text"
              e
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Text Area)"
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
        </>
      )}
      {elementType === "Text Input" && (
        <>
          <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Name
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Name (Element ID)"
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Text Input)"
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Insert Element Header (To be displayed above DropDown)"
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={handleDropdownSelect}
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
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Radio)"
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementOrientation" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Orientation
            </Form.Label>
            <Form.Select
              aria-label="Element Orientation"
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={handleRadioSelect}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {renderRadioOptions()}
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
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Header
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Insert Element Header (To be displayed above Checkbox)"
              onChange={(event) => handleInputChange(event, false)}
            />
          </Form.Group>
          <Form.Group controlId="elementOrientation" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
              Element Orientation
            </Form.Label>
            <Form.Select
              aria-label="Element Orientation"
              onChange={(event) => handleInputChange(event, false)}
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
              onChange={handleCheckboxSelect}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {renderCheckboxOptions()}
        </>
      )}
      {elementType && elementType != "Choose an Element" && (
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
            // type="submit" // no longer submit
            onClick={handleEventSubmission}
          >
            Save Element&nbsp;&nbsp;
            <SendIcon />
          </Button>
        </Stack>
      )}
    </Form>
  );
};

export default ElementEditor;
