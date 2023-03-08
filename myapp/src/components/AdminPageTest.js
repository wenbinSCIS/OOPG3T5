import React, { useState } from "react";

import GenerateSection from "./SectionGeneration";
import "./AdminPage.css";
import AddComponent from "./AddComponent";
import Creator from "./Buttons/Creator";

import EditPanel from "./Buttons/EditPanel";

import SaveComponent from "./SaveComponent";
import FormSelector from "./FormSelector";
import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";

import SectionEditor from "./SectionEditor/SectionEditor";

function MyForm() {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [formComponents, setFormComponents] = useState([]);
  const [infoComponents, setInfoComponents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  // the above has to be removed
  const [sectionData, setSectionData] = useState(null);

  const [isSaved, setSaveStatus] = useState(true);
  const [nameSaveAs, setNameSaveAs] = useState("");
  const [versionSaveAs, setVersionSaveAs] = useState("");
  const [saveText, setSaveText] = useState("");
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [options, setOptions] = useState([
    "Add Name field",
    "Add DropDown",
    "Add TextArea",
    "Add Checkbox",
    "Add Radio",
  ]);

  // const handleInputChange = (event) => {
  //   setElementName(event.target.value);
  // };

  const handleFormSubmit = (data) => {
    setSectionData(data);
    handleAddElement({ target: data });
  };

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }
  function handleLoadForm(event) {
    let formName = event.target.value.split(" ").slice(0, -1).join(" ");
    let version = event.target.value
      .split(" ")
      [event.target.value.split(" ").length - 1].substring(1);
    setSelectedVersion(version);
    setSelectedForm(formName);
  }
  function handleNameSaveAs(event) {
    setNameSaveAs(event.target.value);
  }
  function handleVersionSaveAs(event) {
    setVersionSaveAs(event.target.value);
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
  // name_section.rowElements[0][0].elementHeader = elementName;
  var textarea_section = {
    sectionName: "Feedback",
    sectionText: "Feedback",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "Feedback",
          elementHeader: "",
          elementType: "Textarea",
        },
      ],
    ],
  };
  // textarea_section.rowElements[0][0].elementHeader = elementName;
  var dropdown_section = {
    sectionName: "How",
    sectionText: "Please make a Selection",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "How",
          elementHeader: "",
          elementType: "Dropdown",
          size: "4",
          options: ["Selection A", "Selection B", "Selection C"],
        },
      ],
    ],
  };
  // dropdown_section.rowElements[0][0].elementHeader = elementName;

  var checkbox_section = {
    sectionName: "Recommend",
    sectionText: "Recommend",
    sectionFont: "12",
    numRows: "1",
    rowElements: [[
        {
          elementName: "Recommend",
          elementType: "Checkbox",
          elementHeader: "",
          size: "4",
          options: [{
              optionType: "checkbox",
              optionName:"Yes",
              optionValue:"Yes",
            },
            {
              optionType: "checkbox",
              optionName:"No",
              optionValue:"No",
            },
            {
              optionType: "checkbox-text",
              optionName:"others",
              optionValue:"Others",
              textVariables:{
                //textname will inherit radio optionName + "_text" 
                header:"others",
                hintPosition:"front",
                hintText:"Please specify"
              }
            }]
        }],
      ]
  };

  var radio_section = {
    sectionName: "test",
    sectionText: "Do you like our service?",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "Select",
          elementHeader: "RadioTest",
          elementType: "Radio",
          size: "4",
          options: //["yes","no","others"]
          [
            {
              optionType: "radio",
              optionName:"Yes",
              optionValue:"Yes",
            },
            {
              optionType: "radio",
              optionName:"No",
              optionValue:"No",
            },
            {
              optionType: "radio-text",
              optionName:"others",
              optionValue:"Others",
              textVariables:{
                //textID will inherit radio optionName + "_text" 
                header:"others",
                hintPosition:"front",
                hintText:"Please specify",
                // false_header:null,
              }
            }
          ],
        },
      ],
    ],
  };

  function handleAddElement({ target }) {
    setFormComponents([
      ...formComponents,
      <GenerateSection section={target}></GenerateSection>,
    ]);
    console.log(formComponents);
    setInfoComponents([...infoComponents, target]);
    setSaveStatus(false);
  }

  function handleAddComponent({ name }) {
    // we should specific add components for each type
    let target = textarea_section;
    console.log(name);

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
    if (name == "Add Radio") {
      target = radio_section;
    }
    setFormComponents([
      ...formComponents,
      <GenerateSection section={target}></GenerateSection>,
    ]);
    setInfoComponents([...infoComponents, target]);
    setSaveStatus(false);
  }

  function handleRemoveComponent(index) {
    const updatedComponents = formComponents.filter((_, i) => i !== index);
    const updatedInfoComponents = formComponents.filter((_, i) => i !== index);

    setFormComponents(updatedComponents);
    setInfoComponents(updatedInfoComponents);
    setSaveStatus(false);
  }

  function handleMoveComponentUp(index) {
    if (index === 0) return; // No-op if the element is already at the top
    const updatedComponents = [...formComponents];
    const temp = updatedComponents[index];
    updatedComponents[index] = updatedComponents[index - 1];
    updatedComponents[index - 1] = temp;
    setFormComponents(updatedComponents);
  }

  function handleMoveComponentDown(index) {
    if (index === formComponents.length - 1) return; // No-op if the element is already at the bottom
    const updatedComponents = [...formComponents];
    const temp = updatedComponents[index];
    updatedComponents[index] = updatedComponents[index + 1];
    updatedComponents[index + 1] = temp;
    setFormComponents(updatedComponents);
  }

  /* Below is functions connecting to MongoDB (APIs) */
  async function saveComponents() {
    console.log(infoComponents);
    // fetch
    let formJson = {
      formName: nameSaveAs,
      sections: infoComponents,
      version: versionSaveAs,
    };
    await axios
      .post("http://localhost:8080/api/createForm", formJson)
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          setSaveStatus(true);
          setSaveText("Form saved successfully");
        } else {
          setSaveText("Error saving form");
        }
      });
  }
  async function loadExistingForms() {
    await axios
      .get("http://localhost:8080/api/getAllForms")
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        setAvailableForms(
          data.map((form) => form.formName + " v" + form.version)
        );
      });
  }
  async function loadSelectedForm(formName, version) {
    await axios
      .get(
        "http://localhost:8080/api/getFormByNameAndVersion/" +
          formName +
          "/" +
          version
      )
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        setInfoComponents(data.sections);
        setFormComponents(
          data.sections.map((target) => (
            <GenerateSection section={target}></GenerateSection>
          ))
        );
      });
  }
  // setInterval(loadExistingForms, 5000);

  /* returning the Page */
  return (
    <section className="d-flex">
      <Sidebar></Sidebar>
      <div className="container">
        <FormSelector
          forms={availableForms}
          onChange={handleLoadForm}
          loadForms={loadExistingForms}
        />
        <div className="button-container">
          <Creator
            className="centered-button"
            onClick={() => loadSelectedForm(selectedForm, selectedVersion)}
            text={"Load Form"}
            color="lightgreen"
          />
        </div>
        <SectionEditor onPressed={handleFormSubmit} />
        <div className="button-container">
          <AddComponent
            className="centered-button"
            onAdd={() => setShowAddComponent(!showAddComponent)}
            showAdd={showAddComponent}
          />
        </div>
        {formComponents.map((component, index) => (
          <div key={index}>
            <hr />
            <EditPanel
              MoveDown={() => handleMoveComponentDown(index)}
              MoveUp={() => handleMoveComponentUp(index)}
              // Add={() => handleMoveComponentUp(index)}
              // Edit={() => handleMoveComponentUp(index)}
              Delete={() => handleRemoveComponent(index)}
            />
            {component}
            <hr />
          </div>
        ))}
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
              {/* <div className="button-container">
                <input
                  type="text"
                  className="centered-textbox"
                  placeholder="Enter element name"
                  value={elementName}
                  // onChange={handleInputChange}
                />
              </div> */}
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
        <div className="button-container">
          <SaveComponent
            className="centered-button"
            saveComponents={() => saveComponents()}
            isSaved={isSaved}
            text={saveText}
          />
          <input
            type="text"
            className="centered-textbox"
            placeholder="Form name"
            onChange={handleNameSaveAs}
            style={{ margin: 1 + "em" }}
          />
          <input
            type="text"
            className="centered-textbox"
            placeholder="Version number"
            onChange={handleVersionSaveAs}
          />
        </div>
        {/* {sectionData && (
          <GenerateSection section={sectionData}></GenerateSection>
        )} */}
      </div>
    </section>
  );
}

export default MyForm;
