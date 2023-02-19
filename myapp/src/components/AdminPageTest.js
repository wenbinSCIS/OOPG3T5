import React, { useState } from "react";
import GenerateRow from "./RowGeneration";
import "./AdminPage.css";

function MyForm() {
  const [formComponents, setFormComponents] = useState([]);

  function handleAddComponent() { // we should specific add components for each type
    setFormComponents([
      ...formComponents,
      <GenerateRow
        columns={2}
        inputType={"Textinput"}
        details={[
          ["Full Name", "First Name"],
          ["", "Last Name"],
        ]}
      ></GenerateRow>,
    ]);
  }

  function handleRemoveComponent(index) {
    const updatedComponents = formComponents.filter((_, i) => i !== index);
    setFormComponents(updatedComponents);
  }

  return (
    <div className="container">
      {formComponents.map((component, index) => (
        <div key={index}>
          {component}
          <button onClick={() => handleRemoveComponent(index)}>
            Remove Component
          </button>
        </div>
      ))}
      <div className="button-container">
        {" "}
        <button className="centered-button" onClick={handleAddComponent}>
          Add Component
        </button>
      </div>
    </div>
  );
}

export default MyForm;