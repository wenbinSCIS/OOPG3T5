import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import React, {useState} from "react";

const FormSelector = ({ forms, loadForms , onChange, selectedForm, setSelectedForm, loadFormDisabled, setLoadFormDisabled}) => {
  const location = useLocation();
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedForm(value);
    
    // Enable the Load Form button if a valid option is selected
    if (value == "Select a form to Load") {
      setLoadFormDisabled(true);
    } else {
      setLoadFormDisabled(false);
    }
  };

  return (
    <header className="header">
      {location.pathname === "/FormCreation" && (
        <div>
          <Form>
            <Form.Group
              controlId="placeholderPosition"
              // className="mb-3"
              style={{width: "200px" ,margin: "0 auto" }}
            >
              <Form.Select
                aria-label="Default select example"
                defaultValue="Select a form to Load"
                onChange={onChange}
                onClick={loadForms}
              >
                <option key="Choose a Row" value="Choose a Row">
                  Select a form to Load
                </option>
                {forms.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      )}
    </header>
  );
};

export default FormSelector;
