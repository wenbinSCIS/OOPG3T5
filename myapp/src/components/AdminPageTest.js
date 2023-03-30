import React, { useState , useEffect} from "react";

import GenerateSection from "./SectionGeneration";
import "./AdminPage.css";
import AddComponent from "./AddComponent";
import Creator from "./Buttons/Creator";

import EditPanel from "./Buttons/EditPanel";
import AddButton from "./Buttons/AddButton";

import SaveComponent from "./AdminPageComponents/SaveComponent";
import FormSelector from "./AdminPageComponents/FormSelector";

import axios from "axios";

import Sidebar from "./Sidebar/Sidebar";

import Button from '@mui/material/Button';
import SectionEditor from "./SectionEditor/SectionEditor";
import AutorenewIcon from '@mui/icons-material/Autorenew';

function MyForm() {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [formComponents, setFormComponents] = useState([]);
  const [infoComponents, setInfoComponents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  // the above has to be removed
  const [sectionData, setSectionData] = useState(null);
  const [isVersionNumberEmpty, setIsVersionNumberEmpty] = useState(true);
  const [isFormNameEmpty, setIsFormNameEmpty] = useState(true);
  //const [isLoadButtonDisabled, setIsLoadButtonDisabled] = useState(true);
  const [formsAvailable, setFormsAvailable] = useState(false);
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
    "Add Table",
  ]);
  const [formName, setFormName] = useState("");
  const [versionNumber, setVersionNumber] = useState("");
  const [loadFormDisabled, setLoadFormDisabled] = useState(false);
  // const handleInputChange = (event) => {
  //   setElementName(event.target.value);
  // };

  /*
=============================================================================================
The code below contains API calls to mongoDB configured by kruise
=============================================================================================
*/

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
    const formName = event.target.value;
    setIsFormNameEmpty(formName === '');
    setVersionNumber(versionNumber);
  }
  const handleVersionSaveAs = (event) => {
    setVersionSaveAs(event.target.value);
    const versionNumber = event.target.value;
    setIsVersionNumberEmpty(versionNumber === '');
    setVersionNumber(versionNumber);
  };

  /*
=============================================================================================
The code below contains the parametersfor sections 
using the old elemenent editor (deprecated)

It also contains a dummy response from vendor to be used
for testing purposes
=============================================================================================
*/

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
          options: [
            {
              optionType: "Dropdown",
              optionName: "Yes",
              optionValue: "Yes",
            },
            {
              optionType: "Dropdown",
              optionName: "No",
              optionValue: "No",
            },
          ],
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

  // var response_temp = {
  //   // demo response
  //   formName: "Vendor Assessment",
  //   formTitle: "Quantum Leap Incorporation PTE LTD",
  //   titleSize: "20",
  //   sections: [
  //     {
  //       sectionName: "Company Info",
  //       sectionText: "Fill in your name",
  //       sectionFont: "12",
  //       numRows: "4",
  //       rowElements: [
  //         [
  //           {
  //             elementName: "CompanyName",
  //             elementHeader: "",
  //             placeholder: "Company's Name: ",
  //             placeholderPosition: "front", //either hint or under or front
  //             elementType: "Textinput",
  //           },
  //           {
  //             elementName: "CompanyRegistrationNo",
  //             elementHeader: "",
  //             placeholder: "Company Registration No:",
  //             placeholderPosition: "front", //either hint or under or front
  //             elementType: "Textinput",
  //           },
  //         ],
  //         [
  //           {
  //             elementName: "Like",
  //             elementHeader: "Like",
  //             elementType: "Radio",
  //             size: "12",
  //             elementOrientation: "horizontal",
  //             options: [
  //               {
  //                 optionType: "radio",
  //                 optionName: "Yes",
  //                 optionValue: "Yes",
  //               },
  //               {
  //                 optionType: "radio",
  //                 optionName: "No",
  //                 optionValue: "No",
  //               },
  //               {
  //                 optionType: "radio-text",
  //                 optionName: "others",
  //                 optionValue: "Others",
  //                 textVariables: {
  //                   //textID will inherit radio optionName + "_text"
  //                   header: "",
  //                   hintPosition: "front",
  //                   hintText: "Please specify",
  //                   // false_header:null,
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //         [
  //           {
  //             elementName: "OfficeAddress",
  //             elementHeader: "",
  //             placeholder: "Office Address: ",
  //             placeholderPosition: "front", //either hint or under or front
  //             elementType: "Textinput",
  //           },
  //         ],
  //         [
  //           {
  //             elementName: "Telephone",
  //             elementHeader: "",
  //             placeholder: "Tel: ",
  //             placeholderPosition: "front", //either hint or under or front
  //             elementType: "Textinput",
  //           },
  //           {
  //             elementName: "Fax",
  //             elementHeader: "",
  //             placeholder: "Fax: ",
  //             placeholderPosition: "front", //either hint or under or front
  //             elementType: "Textinput",
  //           },
  //         ],
  //       ],
  //     }, //section 1
  //     {
  //       sectionName: "Evaluation",
  //       sectionText: "Evaluation",
  //       sectionFont: "12",
  //       numRows: "1",
  //       rowElements: [
  //         [
  //           {
  //             elementName: "Licenses",
  //             elementHeader: "",
  //             elementType: "Checkbox",
  //             elementOrientation: "horizontal",
  //             options: [
  //               {
  //                 optionType: "Checkbox",
  //                 optionName: "a. Sole proprietorship",
  //                 optionValue: "a. Sole proprietorship",
  //               },
  //               {
  //                 optionType: "Checkbox",
  //                 optionName: "b. Limited Company",
  //                 optionValue: "b. Limited Company",
  //               },
  //               {
  //                 optionType: "Checkbox",
  //                 optionName: "c. Partnership Agreement",
  //                 optionValue: "c. Partnership Agreement",
  //               },
  //               {
  //                 optionType: "Checkbox-text",
  //                 optionName: "others",
  //                 optionValue: "Others",
  //                 textVariables: {
  //                   //textname will inherit radio optionName + "_text"
  //                   header: "",
  //                   hintPosition: "front",
  //                   hintText: "Please specify",
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //       ],
  //     }, // section 2 done
  //     {
  //       sectionName: "Evaluation-TextArea",
  //       sectionText: "Evaluation",
  //       sectionFont: "12",
  //       numRows: "1",
  //       rowElements: [
  //         [
  //           {
  //             elementName: "Feedback",
  //             elementHeader: "Feedback About us:",
  //             elementType: "Textarea",
  //           },
  //         ],
  //       ],
  //     }, // section 3 done
  //     {
  //       sectionName: "How-Dropdown",
  //       sectionText: "Please make a Selection",
  //       sectionFont: "12",
  //       numRows: "1",
  //       rowElements: [
  //         [
  //           {
  //             elementName: "How-Dropdown",
  //             elementHeader: "",
  //             elementType: "Dropdown",
  //             size: "4",
  //             options: [
  //               {
  //                 optionType: "Dropdown",
  //                 optionName: "Yes",
  //                 optionValue: "Yes",
  //               },
  //               {
  //                 optionType: "Dropdown",
  //                 optionName: "No",
  //                 optionValue: "No",
  //               },
  //             ],
  //           },
  //         ],
  //       ],
  //     }, // section 4 table
  //     {
  //       sectionName: "Contact Information",
  //       sectionText: "Contact Person:",
  //       sectionFont: "12",
  //       numRows: "1",
  //       rowElements: [
  //         [
  //           {
  //             elementName: "How-Table",
  //             elementHeader: "How did you hear about us?*",
  //             elementType: "Dropdown",
  //             size: "4",
  //             options: ["Selection A", "Selection B", "Selection C"],
  //           },
  //         ],
  //         [
  //           {
  //             elementName: "Contacts2",
  //             elementHeader: "",
  //             elementType: "Table",
  //             noRows: "3",
  //             noColumns: "2",
  //             headers: ["Name", "Tel", "Designation"],
  //           },
  //         ],
  //       ],
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   let components = response_temp.sections;
  //   setFormComponents(components);
  // }, []);

  /*
=============================================================================================
I need to pass in section names and element names to ensure that there are no duplicates
=============================================================================================
*/

  const [sectionNames, setSectionNames] = useState([]);
  const [elementNames, setElementNames] = useState([]);

  useEffect(() => {
    let sectionNamesTemp = [];
    formComponents.forEach((section) => {
      const sectionName = section.sectionName;
      sectionNamesTemp.push(sectionName);
    });
    setSectionNames(sectionNamesTemp);
    console.log("section Names are currently: ", sectionNamesTemp);
  },[formComponents]);

  useEffect(() => {
    let elementNamesTemp = [];
    formComponents.forEach((section) => {
      section.rowElements.forEach((elementRow) => {
        elementRow.forEach((element) => {
          const elementName = element.elementName;
          elementNamesTemp = [...elementNamesTemp, elementName];
        });
      });
    });
    setElementNames(elementNamesTemp);
    console.log("element Names are currently: ", elementNamesTemp);
  }, [formComponents]);

  /*
=============================================================================================
userobject, setdata and set all data new paramaters for generate section
=============================================================================================
*/

  var [allData, setallData] = useState({}); //All data to save for user

  if (userObject === undefined) {
    var userObject = {};
  }
  useEffect(() => {
    if (userObject !== undefined) {
      setallData((prevData) => ({ ...prevData, ...userObject }));
    }
    console.log("all data is currently: ", allData);
  }, []); // empty dependency array to run the effect only once

  /*
=============================================================================================
Code below handles the addition of elements, handleAddElement to be built on, however most of these functions should be drepecated,
particularly handleAddComponent

handleAddComponent is deprecated
=============================================================================================
*/

  function handleAddElement({ target }) {
    console.log(target);
    setFormComponents([...formComponents, target]);
    console.log(formComponents);
    setInfoComponents([...infoComponents, target]);
    setSaveStatus(false);
  }

  const handleFormSubmit = (data) => {
    console.log(data);
    setSectionData(data);
    handleAddElement({ target: data });
    console.log(data);
  };

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
      target,
      // <GenerateSection
      //   section={target}
      //   allData={allData}
      //   setallData={setallData}
      // ></GenerateSection>,
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

  function handleAddSection(index) {}

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
          //setSaveText("Form saved successfully");
          alert("Form saved successfully");
        } else {
          //setSaveText("Error saving form");
          alert("Error saving form");
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
        setFormsAvailable(data.length > 0);
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
          // data.sections.map((target) => (
          //   <GenerateSection section={target}></GenerateSection>
          // ))
          data.sections
        );
      });
  }
  console.log("the current components of the form are: ", formComponents);
  // setInterval(loadExistingForms, 5000);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedForm(value);}

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
          <Button
          alignItems="center"
          variant="outlined"
          disabled={loadFormDisabled}
           onClick={() => loadSelectedForm(selectedForm, selectedVersion)}
          >
        <AutorenewIcon />
        &nbsp;Load Form
      </Button>
        </div>
        {/* <SectionEditor
          onPressed={handleFormSubmit}
          sectionNamesList={sectionNames}
          elementNamesList={elementNames}
        /> */}
        <hr></hr>
        <div>
          {formComponents.map((component, index) => (
            <div key={index}>
              {/* <hr /> */}
              <EditPanel
                MoveDown={() => handleMoveComponentDown(index)}
                MoveUp={() => handleMoveComponentUp(index)}
                // Add={() => handleAddSection(index)}
                // Edit={() => handleMoveComponentUp(index)}
                Delete={() => handleRemoveComponent(index)}
                formComponents={formComponents}
                setFormComponents={setFormComponents}
              />
              <GenerateSection
                section={component}
                allData={allData}
                setallData={setallData}
              ></GenerateSection>
              <hr />
            </div>
          ))}
          <div className="button-container" style={{ display: "block" }}>
            <div style={{ textAlign: "center", display: "block" }}>
              <AddButton
                // Add={() => handleAddSection()}
                sectionNamesList={sectionNames}
                elementNamesList={elementNames}
                formComponents={formComponents}
                setFormComponents={setFormComponents}
                allData={allData}
                setallData={setallData}
              />
            </div>
            {/* <div style={{ textAlign: "center", display: "block" }}>
              <AddComponent
                className="centered-button"
                onAdd={() => setShowAddComponent(!showAddComponent)}
                showAdd={showAddComponent}
              />
            </div> */}
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
                      onClick={() =>
                        handleAddComponent({ name: selectedOption })
                      }
                    >
                      Add Element
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
          <div className="button-container">

            <input
              type="text"
              className="centered-textbox"
              placeholder="Form name"
              onChange={handleNameSaveAs}
              style={{
                width: "180px",
                height: "30px",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "7px",
                
              }}
            />
            <input
              type="text"
              className="centered-textbox"
              placeholder="Version number"
              onChange={handleVersionSaveAs}
              //value={versionNumber}
              style={{
                width: "180px",
                height: "30px",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "7px",
                margin: "1em"
              }}
            />
            <SaveComponent
              className="centered-button"
              saveComponents={() => saveComponents()}
              isSaved={isSaved}
              text={saveText}
              formName={formName}
              versionNumber={versionNumber}
              formsAvailable={formsAvailable}
              isVersionNumberEmpty={isVersionNumberEmpty}
              isFormNameEmpty={isFormNameEmpty}
      />
          </div>
        </div>
        {/* {sectionData && (
          <GenerateSection section={sectionData}></GenerateSection>
        )} */}
      </div>
      <div style={{ position: "absolute", bottom: 50, width: "100%" }}></div>
    </section>
  );
}

export default MyForm;
