import React, { useState } from "react";
import GenerateSection from "./SectionGeneration";
import "./AdminPage.css";
import AddComponent from "./AddComponent";

function MyForm() {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [formComponents, setFormComponents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    "Add Name field",
    "Add DropDown",
    "Add TextArea",
    "Add Checkbox",
  ]);

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  var name_section = {
    sectionName: "Name",
    sectionText: "Fill in your name",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "firstName",
          elementHeader: "Full Name",
          placeholder: "First Name",
          placeholderPosition: "hint", //either hint or under for now
          elementType: "Textinput",
        },
        {
          elementName: "lastName",
          elementHeader: "",
          placeholder: "Last Name",
          placeholderPosition: "hint",
          elementType: "Textinput",
        },
      ],
    ],
  };

  var textarea_section = {
    sectionName: "Feedback",
    sectionText: "",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "Feedback",
          elementHeader: "Feedback About us:",
          elementType: "Textarea",
        },
      ],
    ],
  };

  var dropdown_section = {
    sectionName: "How",
    sectionText: "",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "How",
          elementHeader: "How did you hear about us?*",
          elementType: "Dropdown",
          size: "4",
          options: ["Selection A", "Selection B", "Selection C"],
        },
      ],
    ],
  };

  var checkbox_section = {
    sectionName: "Recommend",
    sectionText: "",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "Recommend",
          elementHeader: "Will you be willing to recommend us?",
          elementType: "Checkbox",
          size: "4",
          options: ["Yes", "Maybe", "No"],
        },
      ],
    ],
  };

  function handleAddComponent({name}) {
    // we should specific add components for each type
    let target = textarea_section;
    console.log(name)

    if (name == "Add Name field") {
      target = name_section;
    }
    if (name == "Add TextArea") {
      target = textarea_section;
    }
    if (name == "Add DropDown") {
      target = dropdown_section;
    }
    if (name == "Add Checkbox") {
      target = checkbox_section;
    }

      setFormComponents([
        ...formComponents,
        <GenerateSection section={target}></GenerateSection>,
      ]);
  }

  function handleRemoveComponent(index) {
    const updatedComponents = formComponents.filter((_, i) => i !== index);
    setFormComponents(updatedComponents);
  }

  /*
The expression (_, i) is the parameter list of an arrow function that's passed to the filter method. The filter method creates a new array with all elements that pass the test implemented by the provided function.

In this specific case, the _ variable is a throwaway variable that represents the current element being iterated over in the formComponents array. It's being used here to ignore the value of the current element, as we only care about the index of the element.

The i variable represents the index of the current element being iterated over in the formComponents array.
*/

  return (
    <div className="container">
      {formComponents.map((component, index) => (
        <div key={index}>
          {component}
          <button onClick={() => handleRemoveComponent(index)}>
            Remove Element
          </button>
        </div>
      ))}
      <div className="button-container">
        <AddComponent
          className="centered-button"
          onAdd={() => setShowAddComponent(!showAddComponent)}
          showAdd={showAddComponent}
        />
      </div>
      <>
        {showAddComponent && (
          <div>
            <div className="button-container">
              {" "}
              <select onChange={handleOptionChange}>
                <option value="">Select an Element to add</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {selectedOption && (
              <div className="button-container">
                {" "}
                <button
                  className="centered-button"
                  onClick={() => handleAddComponent({ name: selectedOption })}
                >
                  Add Element
                </button>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
}

export default MyForm;