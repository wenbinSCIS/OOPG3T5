import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import { Modal }  from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';
import SectionEditor from '../SectionEditor/SectionEditor';
import GenerateSection from "../SectionGeneration";
import Preview from '../Preview';
import "../AdminPage.css"


const AddButton = ({Add,formComponents,setFormComponents}) => {
const [showModal, setShowModal] = useState(false);
const [showModal2, setShowModal2] = useState(false);
const [sectionName, setSectionName] = useState("");
const [sectionFontSize, setSectionFontSize] = useState("");
const [sectionText, setSectionText] = useState("");
const [sectionData, setSectionData] = useState(null);
const [isSaved, setSaveStatus] = useState(true);
const [showAddComponent, setShowAddComponent] = useState(false);
// const [formComponents, setFormComponents] = useState([]);
const [infoComponents, setInfoComponents] = useState([]);
const [selectedOption, setSelectedOption] = useState(null);
const [textInput, setTextInput] = useState('');

const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

const handleFormSubmit = (data) => {
  console.log(data)
  setSectionData(data);
  handleAddElement({ target: data });
};
const handleSave = () => {
  // Call the Add function and pass the section name and font size
  const newSection = {
    sectionText: sectionName,
    numRows: 1,
    rowElements: [
      {
        numCols: 1,
        colElements: [
          {
            elementType: "text",
            text: sectionText,
            fontSize: sectionFontSize
          }
        ]
      }
    ]
  };
  Add(newSection);
  // Reset the section name and font size, and hide the modal
  setSectionName("");
  setSectionText("");
  setSectionFontSize("");
  setShowModal2(false);
};
function handleAddElement({ target }) {
  console.log(target);
  setFormComponents([
    ...formComponents,
    <GenerateSection section={target}></GenerateSection>,
  ]);
  console.log(formComponents);
  setInfoComponents([...infoComponents, target]);
  setSaveStatus(false);
}
const handlePreviewClick = () => {
    const newWindow = window.open('', 'Preview', 'width=600,height=400');
    newWindow.document.write('<html><head><title>Preview</title></head><body>');
    newWindow.document.write('<div>');
    newWindow.document.write(<SectionEditor onPressed={handleFormSubmit}/>);
    newWindow.document.write('</div>');
    newWindow.document.write('</body></html>');
  };
  
  return (
    <>
      <Button
        alignItems="center"
        variant="contained"
        color="success"
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
        &nbsp;Add Section
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Add a New Section
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SectionEditor onPressed={handleFormSubmit}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}> 
          Close
          </Button>
          <Button variant="secondary" onChange={handleInputChange} onClick={handlePreviewClick}>Preview</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  };
export default AddButton;
