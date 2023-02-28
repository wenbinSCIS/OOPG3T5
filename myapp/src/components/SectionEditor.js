import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function SectionEditor ({onSubmit}) {
  const [sectionData, setSectionData] = useState({
    sectionName: "New Section",
    sectionText: "New Section",
    numRows: "1",
    sectionFont: "12",
    rowElements: [
      [
        {
          elementName: "firstName",
          elementHeader: "Full Name",
          placeholder: "First Name",
          placeholderPosition: "hint", //either hint or under for now
          elementType: "Textinput",
        },
        {
          elementName: "lastName",
          elementHeader: "",
          placeholder: "Last Name",
          placeholderPosition: "hint",
          elementType: "Textinput",
        },
      ],
    ],
  });

  const [sectionCreated, setSectionCreated] = useState(false);

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setSectionData((prevSectionData) => ({
        ...prevSectionData,
        [id]: value,
      }));
    };

    const handleSubmit = (event) => { // should only be applied for event editor
      event.preventDefault();
      onSubmit(sectionData); //should not sent the data just yet
      // setSectionCreated(!sectionCreated);
      // console.log(sectionCreated);
      // console.log(sectionData); 
    };

    function sectionIsCreated() {
      setSectionCreated(true);
    }

    function sectionNotCreated() {
      setSectionCreated(false);
    }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h5>Section Editor</h5>
        <Form.Group controlId="sectionName" className="mb-3">
          <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Section Name
          </Form.Label>
          <Form.Control
            type="sectionName"
            placeholder="Section Name"
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
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="d-flex">
          <div className="me-3">
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
          </div>
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
              onClick={sectionNotCreated}
            >
              Cancel
            </Button>
          </ThemeProvider>
          <Button
            alignItems="center"
            variant="contained"
            color="primary"
            type="submit"
            onClick={sectionIsCreated}
          >
            Save Section&nbsp;&nbsp;
            <SendIcon />
          </Button>
        </Stack>
      </Form>
      {sectionCreated && (
        <Form>
          <h5>Element Editor [in progress]</h5>
          <Form.Group controlId="elementType">
            <Form.Label
              style={{ margin: 0, color: "deepskyblue" }}
              // style={{ margin: 0, color: "#005FF1", fontWeight: "bold" }}
            >
              Select Type of Element
            </Form.Label>
            <Form.Select
              style={{ width: "32%" }}
              className="custom-select"
              defaultValue="Choose an Element"
              // onChange={handleInputChange}
            >
              <option key="Not an Option" value="Choose an Element">
                Choose an Element
              </option>
              <option key="Text" value="Text">
                Text
              </option>
              <option key="Textinput" value="Text Input">
                Text input
              </option>
              <option key="Textarea" value="Text Area">
                Text Area
              </option>
              <option key="DropdownSelect" value="Dropdown Select">
                Dropdown Select
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
        </Form>
      )}
    </div>
  );
};

export default SectionEditor;
