import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import BuildIcon from "@mui/icons-material/Build";
import { Modal } from "react-bootstrap";
import SectionEditor from "../SectionEditor/SectionEditor";
// import GenerateSection from "../SectionGeneration";
import "../AdminPage.css";

const EditButton = ({
  sectionNamesList,
  elementNamesList,
  formComponents,
  setFormComponents,
  allData,
  setallData,
  index
}) => {
  const [showModal, setShowModal] = useState(false);
  const [sectionData, setSectionData] = useState(null);

  console.log(allData);
  console.log(setallData);

  function handleAddElement({ target, i }) { // handleEdit Element-> must target the index
    console.log(target);
    let formcomponentsTemp = [...formComponents];
    formcomponentsTemp[i] = target;
    setFormComponents([...formcomponentsTemp]);
    console.log(formComponents);
  }

  const handleFormSubmit = (data) => {
    console.log(data);
    setSectionData(data);
    handleAddElement({ target: data, i: index });
  };

  const currentSection = formComponents[index];

  console.log("The current section is", currentSection, index)

  // sectionNames and elementNames used for validation to ensure that there are no duplicate sectionNames or elementNames
  const [sectionNames, setSectionNames] = useState(sectionNamesList);
  const [elementNames, setElementNames] = useState(elementNamesList);

  useEffect(() => {
    setSectionNames(sectionNamesList);
    setElementNames(elementNamesList);
  }, [sectionNamesList, elementNamesList]);

  return (
    <>
      <Button
        alignItems="center"
        variant="contained"
        color="info"
        onClick={() => setShowModal(true)}
      >
        <BuildIcon />
        &nbsp;Edit
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Existing Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SectionEditor
            onPressed={handleFormSubmit}
            sectionNamesList={sectionNames}
            elementNamesList={elementNames}
            index={index}
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
export default EditButton;
