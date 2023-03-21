import React, { useState, useEffect } from "react";

import GenerateSection from "./SectionGeneration";
import "./AdminPage.css";
import AddComponent from "./AddComponent";
import Creator from "./Buttons/Creator";

import EditPanel from "./Buttons/EditPanel";

import SaveComponent from "./SaveComponent";
import FormSelector from "./FormSelector";
import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";
import AddButton from './Buttons/AddButton';

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
    "Add Table"
  ]);

  // const handleInputChange = (event) => {
  //   setElementName(event.target.value);
  // };

  const handleFormSubmit = (data) => {
    console.log(data)
    setSectionData(data);
    handleAddElement({ target: data });
    console.log(data);
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
    rowElements: [
      [
        {
          elementName: "Recommend",
          elementType: "Checkbox",
          elementHeader: "",
          size: "4",
          options: [
            {
              optionType: "checkbox",
              optionName: "Yes",
              optionValue: "Yes",
            },
            {
              optionType: "checkbox",
              optionName: "No",
              optionValue: "No",
            },
            {
              optionType: "checkbox-text",
              optionName: "others",
              optionValue: "Others",
              textVariables: {
                //textname will inherit radio optionName + "_text"
                header: "others",
                hintPosition: "front",
                hintText: "Please specify",
              },
            },
          ],
        },
      ],
    ],
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
          //["yes","no","others"]
          options: [
            {
              optionType: "radio",
              optionName: "Yes",
              optionValue: "Yes",
            },
            {
              optionType: "radio",
              optionName: "No",
              optionValue: "No",
            },
            {
              optionType: "radio-text",
              optionName: "others",
              optionValue: "Others",
              textVariables: {
                //textID will inherit radio optionName + "_text"
                header: "others",
                hintPosition: "front",
                hintText: "Please specify",
                // false_header:null,
              },
            },
          ],
        },
      ],
    ],
  };

  var table_section = {
    sectionName: "Contact Information",
    sectionText: "Contact Person:",
    sectionFont: "12",
    numRows: "2",
    rowElements: [
      [
        {
          elementName: "Contacts",
          elementHeader: "",
          elementType: "Table",
          noRows: "3",
          noColumns: "2",
          headers: ["Name", "Tel", "Designation"],
        },
      ],
      [
        {
          elementName: "Feedback",
          elementHeader: "Feedback About us:",
          elementType: "Textarea",
        },
      ],
    ],
  };

  /*
=============================================================================================
userobject, setdata and set all data new paramater for generate section
=============================================================================================
*/

  // var userObject =
  //   //this object will be called from API
  //   {
  //     CompanyName: "Write",
  //     CompanyRegistrationNo: "Anything",
  //     OfficeAddress: "SMU",
  //     Telephone: "123456",
  //     Fax: "123123",
  //     Contacts: [
  //       {
  //         Name: "123456",
  //         Tel: "123",
  //       },
  //       {
  //         Tel: "123",
  //         Designation: "asdadad",
  //       },
  //       {
  //         Designation: "asdasdad",
  //       },
  //     ],
  //     How: "Selection B",
  //     Like: {
  //       name: "Others",
  //       type: "radio-text",
  //       text: "here as well",
  //     },
  //     Licenses: [
  //       {
  //         name: "b. Limited Company",
  //         type: "Checkbox",
  //         text: "",
  //       },
  //       {
  //         name: "Others",
  //         type: "Checkbox-text",
  //         text: "asdas",
  //       },
  //     ],
  //     Feedback: "asdasdadad",
  //   };

  var [allData, setallData] = useState({}); //All data to save for user

  if (userObject === undefined) {
    var userObject = {};
  }
  useEffect(() => {
    if (userObject !== undefined) {
      setallData((prevData) => ({ ...prevData, ...userObject }));
    }
    console.log(allData);
  }, []); // empty dependency array to run the effect only once

  /*
=============================================================================================
Code below handles the addition of elements, handleAddElement to be built on

handleAddComponent is deprecated
=============================================================================================
*/

  function handleAddElement({ target }) {
    console.log(target);
    setFormComponents([
      ...formComponents,
      <GenerateSection
        section={target}
        allData={allData}
        setallData={setallData}
      ></GenerateSection>,
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
    if (name == "Add Table") {
      target = table_section;
    }
    setFormComponents([
      ...formComponents,
      <GenerateSection
        section={target}
        allData={allData}
        setallData={setallData}
      ></GenerateSection>,
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
  function handleAddSection(index){

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
  console.log(formComponents)
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
<div className="button-container" style={{ display: 'block' }}>
  <div style={{ textAlign: 'center', display: 'block' }}>
    <AddButton
      Add={() => handleAddSection()}
      formComponents={formComponents}
      setFormComponents={setFormComponents}
      allData={allData}
      setallData={setallData}
    />
  </div>
  <div style={{ textAlign: 'center', display: 'block' }}>
    <AddComponent
      className="centered-button"
      onAdd={() => setShowAddComponent(!showAddComponent)}
      showAdd={showAddComponent}
    />
  </div>
</div>

        
        <div id='previewSection'>
          {formComponents.map((component, index) => (
            <div key={index}>
              <hr />
              <EditPanel
                MoveDown={() => handleMoveComponentDown(index)}
                MoveUp={() => handleMoveComponentUp(index)}
                Add={() => handleAddSection(index)}
                // Edit={() => handleMoveComponentUp(index)}
                Delete={() => handleRemoveComponent(index)}
                formComponents={formComponents}
                setFormComponents={setFormComponents}
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
        </div>
        {/* {sectionData && (
          <GenerateSection section={sectionData}></GenerateSection>
        )} */}
      </div>
        <div style={{ position: "absolute", bottom: 50, width: "100%" }}>
    </div>
    </section>
    
  );
}

export default MyForm;
