import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import Textarea from './Textarea';
import TextInput from './TextInput';
import Text from './Text';

const ElementEditor = ({ sectionCreated, handleInputChange }) => {
    const [elementType, setElementType] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
      setElementType(event.target.value);
    };
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    // const handleValueChange = (e) => {
    //     const { id, value } = e.target;
    //     setSelectedOptions((prevSelectedOptions) => ({
    //       ...prevSelectedOptions,
    //       [id]: value,
    //     }));
    //   };

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
            className="mb-3"
            placeholder="Insert Element Name"  
          />
      </Form.Group>
      <Form.Group controlId="Text" className="mb-3">
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Text
        </Form.Label>
        <Form.Control
            type="text"
            className="mb-3"
            placeholder="This is Text"  
          />
      </Form.Group>
      <Form.Group controlId="textSize" className="mb-3" style={{ width: "32%" }}>
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
                    className="mb-3"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    className="mb-3"
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
                    className="mb-3"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>
            <Form.Group controlId="placeholder" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Placeholder
                </Form.Label>
                <Form.Control
                    type="text"
                    className="mb-3"
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
                    <option value="front">Under</option>
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
                className="mb-3"
                placeholder="Insert Element Name"  
            />
        </Form.Group>
        <Form.Group controlId="elementHeader" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Element Header
            </Form.Label>
            <Form.Control
                type="text"
                className="mb-3"
                placeholder="Insert Element Header"  
            />
        </Form.Group>
        {/* <Form.Group controlId="size" className="mb-3">
            <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
            Size
            </Form.Label>
            <Form.Control
                type="text"
                className="mb-3"
                placeholder="Insert size"  
            />
        </Form.Group> */}
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
        <Form.Control
            type="text"
            placeholder="Enter Dropdown value 1 "
            className="mb-3"
            name="dropdownValue1"
        />
        <Form.Control
            type="text"
            placeholder="Enter Dropdown value 2 "
            className="mb-3"
            name="dropdownValue2"
        />
        <Form.Control
            type="text"
            placeholder="Enter Dropdown value 3 "
            className="mb-3"
            name="dropdownValue3"
        />
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
                    className="mb-3"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>
        <Form.Group controlId="elementOrientation" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Orientation
                </Form.Label>
                <Form.Select aria-label="Element Orientation">
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="options" className="mb-3" style={{ width: "32%" }}>
    <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
        Default Options
    </Form.Label>
    <div>
        <Form.Check
            type="radio"
            label="Yes"
            name="options"
            id="yes-radio"
        />
        <Form.Check
            type="radio"
            label="Maybe"
            name="options"
            id="maybe-radio"
        />
        <Form.Check
            type="radio"
            label="No"
            name="options"
            id="no-radio"
        />
        <Form.Control
            type="text"
            placeholder="Enter Radio value 1 "
            className="mb-3"
            name="radioValue1"
        />
        <Form.Control
            type="text"
            placeholder="Enter Radio value 2 "
            className="mb-3"
            name="radioValue2"
        />
        <Form.Control
            type="text"
            placeholder="Enter Radio value 3 "
            className="mb-3"
            name="radioValue3"
        />

    </div>
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
                    className="mb-3"
                    placeholder="Insert Element Name"  
                />
            </Form.Group>
            <Form.Group controlId="elementHeader" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Header
                </Form.Label>
                <Form.Control
                    type="text"
                    className="mb-3"
                    placeholder="Insert Element Header"  
                />
            </Form.Group>
            <Form.Group controlId="elementOrientation" className="mb-3">
                <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
                Element Orientation
                </Form.Label>
                <Form.Select aria-label="Element Orientation">
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="options" className="mb-3">
        <Form.Label style={{ margin: 0, color: "deepskyblue" }}>
          Checkbox Values
        </Form.Label>
        <div>
          <Form.Check
            type="checkbox"
            label="Selection A"
            value="selectionA"
            id="selectionA-checkbox"
            onChange={handleOptionChange}
          />
          {selectedOption === "selectionA" && (
            <>
              <Form.Label>Checkbox A:</Form.Label>
              <Form.Control type="text" placeholder="Enter Checkbox value A" 
                className="mb-3"/>
                
            </>
          )}
          <Form.Check
            type="checkbox"
            label="Selection B"
            value="selectionB"
            id="selectionB-checkbox"
            onChange={handleOptionChange}
          />
          {selectedOption === "selectionB" && (
            <>
              <Form.Label>Checkbox B:</Form.Label>
              <Form.Control type="text" placeholder="Enter Checkbox value B" 
                className="mb-3"/>
            </>
          )}
          <Form.Check
            type="checkbox"
            label="Selection C"
            value="selectionC"
            id="selectionC-checkbox"
            onChange={handleOptionChange}
          />
          {selectedOption === "selectionC" && (
            <>
              <Form.Label>Checkbox C:</Form.Label>
              <Form.Control type="text" placeholder="Enter Checkbox value C" 
                className="mb-3"/>
            </>
          )}
        </div>
      </Form.Group>
        </Form>


        )} 
    </Form>
  ) 
};


export default ElementEditor;
