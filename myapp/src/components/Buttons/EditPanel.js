import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
// import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import { Modal } from "react-bootstrap";
import "../AdminPage.css";

const EditPanel = ({
  MoveDown,
  MoveUp,
  Add,
  Edit,
  Delete,
  formComponents,
  setFormComponents,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ justifyContent: "flex-end" }}
      >
        <IconButton onClick={MoveDown}>
          <ExpandCircleDownIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={MoveUp}>
          <ExpandCircleDownIcon
            fontSize="large"
            sx={{ transform: "rotate(180deg)" }}
          />
        </IconButton>
        {/* <Button
          alignItems="center"
          variant="contained"
          color="success"
          onClick={() => setShowModal2(true)}
        >
          <AddIcon />
          &nbsp;Add
        </Button>
        <Modal style show={showModal2} onHide={() => setShowModal2(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add a New Section</Modal.Title>
        </Modal.Header> 

          <Modal.Body>          
            <SectionEditor onPressed={handleFormSubmit}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal2(false)}>
              Cancel
            </Button> */}
        {/* <Button variant="primary" onClick={handleSave}>
              Save
            </Button> */}
        {/* </Modal.Footer>
        </Modal> */}
        {/* <Button
          alignItems="center"
          variant="contained"
          color="info"
          onClick={() => setShowModal(true)}
        >
          <BuildIcon />
          &nbsp;Edit
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
        </Modal> */}
        <Button
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          // startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          onClick={Delete}
        >
          <HighlightOffIcon />
          &nbsp;Remove
        </Button>
      </Stack>
    </div>
  );
};

export default EditPanel;
