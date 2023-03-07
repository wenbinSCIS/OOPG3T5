import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import { Modal }  from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';


const EditPanel = ({MoveDown,MoveUp,Add,Edit,Delete}) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ justifyContent: "flex-end" }}
      >
        <IconButton
          onClick={MoveDown}
        >
          <ExpandCircleDownIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={MoveUp}
        >
          <ExpandCircleDownIcon
            fontSize="large"
            sx={{ transform: "rotate(180deg)" }}
          />
        </IconButton>
        <Button
          alignItems="center"
          variant="contained"
          color="success"
          onClick={Add}
        >
          <AddIcon />
          &nbsp;Add
        </Button>
        <Button
          alignItems="center"
          variant="contained"
          color="primary"
          onClick={() => setShowModal(true)}
        >
          <BuildIcon />
          &nbsp;Edit
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Section Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body><Form>
            <Form.Group controlId="form">
              <Form.Label style={{ color: 'deepskyblue' }}>Section Name*</Form.Label>
              <Form.Control className="mb-3" type="text" placeholder="Section_name" />
            </Form.Group>
            <Form.Group controlId="form">
              <Form.Label style={{ color: 'deepskyblue' }}>Section Text</Form.Label>
              <Form.Control className="mb-3" type="text" placeholder="Section_text" />
            </Form.Group>
            <Form.Group controlId="form">
              <Form.Label style={{ color: 'deepskyblue' }}>Element Name</Form.Label>
              <Form.Control className="mb-3" type="text" placeholder="Element_name" />
            </Form.Group>
            <Form.Group controlId="form">
            <Form.Label style={{ color: 'deepskyblue' }}>Section Font (optional)</Form.Label>
            <Form.Select className="mb-3">
              <option>Select font</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="form">
            <Form.Label style={{ color: 'deepskyblue' }}>Font Size</Form.Label>
            <Form.Select className="mb-3">
              <option>Select a font size</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </Form.Select>
          </Form.Group>
          </Form></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="btn-primary" onClick={() => console.log('Save changes')}>
              Save 
            </Button>
          </Modal.Footer>
          <style>{`
            .modal-content {
              border: 2px solid black;
            }
            .fade.modal-backdrop.show{
              z-index:1039;
            }
          `}</style>
        </Modal>
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
