import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import Textarea from './Textarea';
import TextInput from './TextInput';
import Text from './Text';

const ElementEditor = ({ sectionCreated, handleInputChange }) => {
    const [elementType, setElementType] = useState("");
  
const handleChange = (event) => {
      setElementType(event.target.value);
    };

  
    //   const handleSubmit = (event) => { // should only be applied for event editor
    //     event.preventDefault();
    //     onSubmit(sectionData); //should not sent the data just yet
    //     // setSectionCreated(!sectionCreated);
    //     // console.log(sectionCreated);
    //     // console.log(sectionData); 
    //   };

return (
    <Form>
      <h5>Element Editor [in progress]</h5>
      <Form.Group controlId="elementType">
        <Form.Label
          style={{ margin: 0, color: "deepskyblue" }}
          
        >
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
      {elementType === "Text" && (
    
    <Form>
      <Form.Group controlId="elementName" className="mb-3">
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Element Name
        </Form.Label>
        <Form.Control
            type="text"
            placeholder="Insert Element Name"  
          />
      </Form.Group>
      <Form.Group controlId="Text" className="mb-3">
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Text
        </Form.Label>
        <Form.Control
            type="text"
            placeholder="This is Text"  
          />
      </Form.Group>
      <Form.Group controlId="textSize" className="mb-3"style={{ width: "32%" }}>
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Text Size
        </Form.Label>
        <Form.Select aria-label="Default select example">
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="24">24</option>
        </Form.Select>
      </Form.Group>
     </Form>       
     )}
      {elementType === "Text Area" && (
    
        <Form>
            <Form.Group controlId="elementName" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>

        </Form> 
      )}
      {elementType === "Text Input" && (
    
        <Form>
            <Form.Group controlId="elementName" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>
            <Form.Group controlId="placeholder" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Placeholder
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert placeholder"  
                />
            </Form.Group>
            <Form.Group controlId="placeholder" className="mb-3"style={{ width: "32%" }}>
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Placeholder position
                </Form.Label>
                <Form.Select aria-label="Default select example">
                    <option value="hint">Hint</option>
                    <option value="under">Under</option>
                </Form.Select>
            </Form.Group>
        </Form>    
     )} 
     {elementType === "Dropdown Select" && (

    
    <Form>
        <Form.Group controlId="elementName" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Element Name
            </Form.Label>
            <Form.Control
                type="text"
                placeholder="Insert Element Name"  
            />
        </Form.Group>
        <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Element Header
            </Form.Label>
            <Form.Control
                type="text"
                placeholder="Insert Element Header"  
            />
        </Form.Group>
        <Form.Group controlId="size" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Size
            </Form.Label>
            <Form.Control
                type="text"
                placeholder="Insert size"  
            />
        </Form.Group>
        <Form.Group controlId="options" className="mb-3"style={{ width: "32%" }}>
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Options
            </Form.Label>
            <Form.Select aria-label="Default select example">
                <option value="selectionA">Selection A</option>
                <option value="selectionB">Selection B</option>
                <option value="selectionC">Selection C</option>
            </Form.Select>
        </Form.Group>
    </Form> 

     )} 

      {elementType === "Radio" && (

    
        <Form>
            <Form.Group controlId="elementName" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>
            <Form.Group controlId="size" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Size
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert size"  
                />
            </Form.Group>
            <Form.Group controlId="options" className="mb-3"style={{ width: "32%" }}>
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Options
                </Form.Label>
                <Form.Select aria-label="Default select example">
                    <option value="Yes">Yes</option>
                    <option value="Maybe">Maybe</option>
                    <option value="No">No</option>
                </Form.Select>
            </Form.Group>
        </Form>

      )} 
      {elementType === "Checkbox" && (         
        <Form>
            <Form.Group controlId="elementName" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>
            <Form.Group controlId="size" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Size
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Insert size"  
                />
            </Form.Group>
            <Form.Group controlId="options" className="mb-3"style={{ width: "32%" }}>
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Options
                </Form.Label>
                <Form.Select aria-label="Default select example">
                    <option value="selectionA">Selection A</option>
                    <option value="selectionB">Selection B</option>
                    <option value="selectionC">Selection C</option>
                </Form.Select>
            </Form.Group>
        </Form>


        )} 
    </Form>
  ) 
};

export default ElementEditor;
