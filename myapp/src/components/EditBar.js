import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenerateSection from './SectionGeneration';
import GenerateRow from './RowGeneration';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from "./Sidebar/Sidebar";

import {
  Container,
  Navbar,
  Form,
  Row,
  Col,
  Table,
} from 'react-bootstrap';

function EditBar() {
  const [formComponents, setFormComponents] = useState([]);
  const [rowElements, setRowElements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sectionCount, setSectionCount] = useState(1);
  const handleUpButton = () => {
    console.log('up');
  };

  const handleDownButton = () => {
    console.log('down');
  };

  function handleRemoveButton(index) {
    const updatedComponents = formComponents.filter((_, i) => i !== index);
    setFormComponents(updatedComponents);
  }

  const addButtonStyle = {
    backgroundColor: 'green',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '5px',
  };

  const editButtonStyle = {
    backgroundColor: 'skyblue',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '5px',
  };

  const removeButtonStyle = {
    backgroundColor: 'red',
    border: 'none',
    padding: '5px 20px',
    borderRadius: '5px',
  };

  const handleAddRow = () => {
    setRowElements(rowElements.concat([[]]));
  };

  const handleRemoveRow = (index) => {
    setRowElements(rowElements.filter((_, i) => i !== index));
  };

  const handleAddElement = (rowIndex) => {
    const newRowElements = [...rowElements];
    newRowElements[rowIndex] = newRowElements[rowIndex].concat({
      elementType: '',
      elementHeader: '',
      elementName: '',
      placeholder: '',
      placeholderPosition: '',
      options: [],
      noColumns: '',
      noRows: '',
      size: '',
    });
    setRowElements(newRowElements);
  };

  const handleRemoveElement = (rowIndex, elementIndex) => {
    const newRowElements = [...rowElements];
    newRowElements[rowIndex] = newRowElements[rowIndex].filter(
      (_, i) => i !== elementIndex
    );
    setRowElements(newRowElements);
  };

  const handleUpdateElement = (rowIndex, elementIndex, key, value) => {
    const newRowElements = [...rowElements];
    newRowElements[rowIndex][elementIndex][key] = value;
    setRowElements(newRowElements);
  };
  var test = 0;
  return (
    <>
    <section className='d-flex'>
      <Sidebar></Sidebar>
    <div class="container">
      <Navbar
        className='mb-5'
        expand='sm'
        variant='dark'
        style={{ backgroundColor: 'rgba(86, 113, 255, 1)' }}
      >
        <Container style={{ maxWidth: '540px' }}>
          <Navbar.Brand>Form Name v1.1</Navbar.Brand>
          <Button type='submit'>Save</Button>
        </Container>
      </Navbar>
      
      <div className='container'>
            {rowElements.map((row, rowIndex) => (
                <div key={rowIndex}>
                    <div className='row mb-3'>
                        <div className='col'>
                            <h5>Test Row  {rowIndex + 1}</h5> 
                        </div>
                        <div className='col text-end'>
                            <button onClick={handleUpButton}> &#9650;</button>
                            <button onClick={handleDownButton}>&#9660;</button>
                            <button type='button' style={addButtonStyle} onClick={handleAddRow}>Add </button>
                            <Button style={editButtonStyle}onClick={() => setShowModal(true)}>Edit</Button>
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Modal Body</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                                </Button>
                                <Button variant="primary" onClick={() => console.log('Save changes')}>
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

                            <button type='button' style={removeButtonStyle} onClick={() => handleRemoveRow(rowIndex)}>Remove</button>
                        </div>

                    </div>
                    {row.map((element, elementIndex) => (
                        <GenerateRow
                            key={`${rowIndex}-${elementIndex}`}
                            info={element}
                            rowIndex={rowIndex}
                            elementIndex={elementIndex}
                            handleUpdateElement={handleUpdateElement}
                            handleRemoveElement={handleRemoveElement}
                        />
                    ))}
                </div>
            ))}
            <div className='row'>
                <div className='col text-end'>
                    <button type='button' style={addButtonStyle} onClick={handleAddRow}>Add Section</button>
                </div>
            </div>
        </div>
      <div>
        <div className="container">
          {formComponents.map((component, index) => (
            <div key={index}>
              {component}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
    </>
  );
  
}  
    
    export default EditBar;
