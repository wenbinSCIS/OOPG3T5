import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";

import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ElementEditor from "./ElementEditor";

function SectionEditor({
  onPressed,
  sectionNamesList,
  elementNamesList,
  index = null,
  currentSection,
}) {
  /*
=============================================================================================
const sectionData: intializes the section with the section font 12

useEffect: logs changes to section data everytime a change is made

theme: provides theme for buttons
=============================================================================================
*/

  const [sectionData, setSectionData] = useState(currentSection);

  useEffect(
    () => console.log("The Section State is: ", sectionData),
    [sectionData]
  ); // add this to log all changes to SectionState

  const [sectionCreated, setSectionCreated] = useState(false);

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

  /*
=============================================================================================
const sectionNames: used for validation to ensure no duplicate section Names

const elementNames: used for validation to ensure no duplicate element Names

useEffect: is activated if there are new sections, elements added

const Active and handleToggle: handles whether open element editor or close element
editor is active or disabled

=============================================================================================
*/

  const [sectionNames, setSectionNames] = useState(sectionNamesList);
  const [elementNames, setElementNames] = useState(elementNamesList);

  const [sectionNameInitialized, setSectionNameInitialized] = useState(null); // checking if the sectionName is present (i.e editing a section)

  const [sectionName, setSectionName] = useState("");
  const [sectionText, setSectionText] = useState("");

  useEffect(() => {
    if (index !== null) {
      setSectionNameInitialized(currentSection.sectionName);
      console.log(
        "The current initalized section name is ",
        currentSection.sectionName
      );
      setSectionName(currentSection.sectionName);
      setSectionText(currentSection.sectionText);
    }
  }, []);

  useEffect(() => {
    setSectionNames(sectionNamesList);
  }, sectionNamesList);

  useEffect(() => {
    setElementNames(elementNamesList);
  }, elementNamesList);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSectionData((prevSectionData) => ({
      ...prevSectionData,
      [id]: value,
    }));
    if (id === "sectionName") {
      setSectionName(value);
    }
    if (id === "sectionText") {
      setSectionText(value);
    }
  };

  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  /*
=============================================================================================
const formRef: used to reset form so that it is empty everytime its generated

retrieveFromElementEditor: retrieves section Data from element editor

sectionIsCreated and sectionNotCreated: Controls the state for showing
the element editor
=============================================================================================
*/

  const formRef = useRef(null); // this is used so that the form is reset everytime someone saves a new section -i.e, no more fields present

  const retrieveFromElementEditor = (rows) => {
    const newSection = { ...sectionData };
    newSection.rowElements = rows;
    const rowsLength = rows.length;
    newSection.numRows = String(rowsLength);
    onPressed(newSection); // send info to admin page
    setSectionCreated(false); // closes element editor when save section is initiated
    setIsActive(true); // closes element editor and sets active state for open element editor
    setSectionData({
      // I need to do this if not there is residual data on the section when on save, which will be viewed in the preview tab
      sectionFont: "12",
    });
    formRef.current.reset();
  };

  function sectionIsCreated() {
    if ("sectionName" in sectionData && "sectionText" in sectionData) {
      console.log("printing out sectionNames in sectionEditor", sectionNames);
      console.log("printing out elementNames in sectionEditor", elementNames);
      if (sectionNames.includes(sectionData.sectionName)) {
        if ((sectionData.sectionName = sectionNameInitialized)) {
          setSectionCreated(true);
          handleToggle();
        } else {
          alert("Section Name is already used, please try another one");
        }
      } else {
        setSectionCreated(true);
        handleToggle();
      }
    } else {
      alert("Please fill up empty section editor fields!");
    }
  }

  function sectionNotCreated() {
    const result = window.confirm(
      "Do you want to close element editor? all changed section data will be deleted",
      "Yes, please close it"
    );
    if (result) {
      setSectionCreated(false);
      handleToggle();
    }
  }
  return (
    <div>
      <Form ref={formRef}>
        <h5>Section Editor</h5>
        <Form.Group controlId="sectionName" className="mb-3">
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Section Name
          </Form.Label>
          <Form.Control
            type="sectionName"
            placeholder="Section Name"
            value={sectionName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="sectionText" className="mb-3">
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Section Text
          </Form.Label>
          <Form.Control
            type="sectionText"
            placeholder="Section Text"
            value = {sectionText}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="d-flex">
          {/* <div className="me-3">
            <Form.Group controlId="numRows">
              <Form.Label
                style={{ margin: 0, color: "deepskyblue" }}
                // style={{ margin: 0, color: "#005FF1", fontWeight: "bold" }}
              >
                Select number of Element Rows
              </Form.Label>
              <Form.Select
                // style={{ width: "32%" }}
                className="custom-select"
                defaultValue="1"
                onChange={handleInputChange}
              >
                {Array.from({ length: 15 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div> */}
          <div>
            <Form.Group controlId="sectionFont">
              <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Select Font (Optional)
              </Form.Label>
              <Form.Select
                className="custom-select"
                defaultValue="12"
                onChange={handleInputChange}
              >
                {Array.from({ length: 20 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ justifyContent: "flex-end" }}
        >
          <ThemeProvider theme={theme}>
            <Button
              color="neutral"
              variant="contained"
              disabled={isActive}
              onClick={sectionNotCreated}
            >
              Close Element Editor
            </Button>
          </ThemeProvider>
          <Button
            alignItems="center"
            variant="contained"
            color="primary"
            // type="submit" // no longer submit
            disabled={!isActive}
            onClick={sectionIsCreated}
          >
            Open Element Editor&nbsp;&nbsp;
            <SendIcon />
          </Button>
        </Stack>
      </Form>
      {sectionCreated && (
        <ElementEditor
          onPressedElement={retrieveFromElementEditor}
          sectionState={sectionData}
          elementNamesList={elementNames}
          index={index}
        /> // onPressedElement - need to add handle submit here? -> need to be at Save and Close as submit button within element editor
      )}
    </div>
  );
}

export default SectionEditor;
