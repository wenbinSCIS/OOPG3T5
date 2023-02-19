import React, { useState } from "react";
import GenerateSection from "./SectionGeneration";
import "./AdminPage.css";

function MyForm() {
  const [formComponents, setFormComponents] = useState([]);
  var each_section = {
    "sectionName":"Name",
    "sectionText":"Fill in your name",
    "sectionFont":"12", 
    "numRows":"1",
    "rowElements":[[
        {
            "elementName":"firstName",
            "elementHeader":"Full Name",
            "placeholder":"First Name",
            "placeholderPosition":"hint", //either hint or under for now
            "elementType":"Textinput",
        },
        {
          "elementName":"lastName",
          "elementHeader":"",
          "placeholder":"Last Name",
          "placeholderPosition":"hint",
          "elementType":"Textinput",
        }
    ]]
}

  function handleAddComponent() { // we should specific add components for each type
    setFormComponents([
      ...formComponents,
      <GenerateSection section={each_section}></GenerateSection>,
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