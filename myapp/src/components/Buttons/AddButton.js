import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import SectionEditor from "../SectionEditor/SectionEditor";
// import GenerateSection from "../SectionGeneration";
import "../AdminPage.css";

const AddButton = ({
  sectionNamesList,
  elementNamesList,
  formComponents,
  setFormComponents,
  allData,
  setallData,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  // const [sectionName, setSectionName] = useState("");
  // const [sectionFontSize, setSectionFontSize] = useState("");
  // const [sectionText, setSectionText] = useState("");
  const [sectionData, setSectionData] = useState(null);
  const [isSaved, setSaveStatus] = useState(true);
  const [infoComponents, setInfoComponents] = useState([]);
  const [textInput, setTextInput] = useState("");

  console.log(allData);
  console.log(setallData);
  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  function handleAddElement({ target }) {
    console.log(target);
    setFormComponents([
      ...formComponents,
      target,
      // <GenerateSection
      //   section={target}
      //   allData={allData}
      //   setallData={setallData}
      // ></GenerateSection>,
    ]);
    console.log(formComponents);
    setInfoComponents([...infoComponents, target]);
    setSaveStatus(false);
  }

  const handleFormSubmit = (data) => {
    console.log(data);
    setSectionData(data);
    handleAddElement({ target: data });
  };
  // const handleSave = () => {
  //   // Call the Add function and pass the section name and font size
  //   const newSection = {
  //     sectionText: sectionName,
  //     numRows: 1,
  //     rowElements: [
  //       {
  //         numCols: 1,
  //         colElements: [
  //           {
  //             elementType: "text",
  //             text: sectionText,
  //             fontSize: sectionFontSize
  //           }
  //         ]
  //       }
  //     ]
  //   };
  //   Add(newSection);
  //   // Reset the section name and font size, and hide the modal
  //   setSectionName("");
  //   setSectionText("");
  //   setSectionFontSize("");
  //   setShowModal2(false);
  // };


  // sectionNames and elementNames used for validation to ensure that there are no duplicate sectionNames or elementNames
  const [sectionNames, setSectionNames] = useState(sectionNamesList);
  const [elementNames, setElementNames] = useState(elementNamesList);

  useEffect(() => {
    setSectionNames(sectionNamesList);
    setElementNames(elementNamesList);
  }, [sectionNamesList, elementNamesList]);

  // const handlePreviewClick = () => {
  //   const newWindow = window.open("", "Preview", "width=600,height=400");
  //   newWindow.document.write("<html><head><title>Preview</title></head><body>");
  //   newWindow.document.write("<div>");
  //   newWindow.document.write(<SectionEditor onPressed={handleFormSubmit} />);
  //   newWindow.document.write("</div>");
  //   newWindow.document.write("</body></html>");
  // };

  const currentSection = {sectionData: "12"};

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
          <Modal.Title>Add a New Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SectionEditor
            onPressed={handleFormSubmit}
            sectionNamesList={sectionNames}
            elementNamesList={elementNames}
            currentSection={currentSection}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddButton;
