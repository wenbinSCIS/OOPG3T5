import React, { useState  } from "react";
import GenerateSection from "./SectionGeneration";
import "./AdminPage.css";
import AddComponent from "./AddComponent";
import SaveComponent from "./SaveComponent";
import FormSelector from "./FormSelector";
import Button from "./Button";
import axios from 'axios';
function MyForm() {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [formComponents, setFormComponents] = useState([]);
  const [infoComponents, setInfoComponents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [elementName, setElementName] = useState('');
  const [isSaved, setSaveStatus] = useState(true);
  const [nameSaveAs, setNameSaveAs] = useState('');
  const [versionSaveAs, setVersionSaveAs] = useState('');
  const [saveText, setSaveText] = useState('');
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [options, setOptions] = useState([
    "Add Name field",
    "Add DropDown",
    "Add TextArea",
    "Add Checkbox",
    "Add Radio",
  ]);
    
    const handleInputChange = (event) => {
      setElementName(event.target.value);
    }

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }
  function handleLoadForm(event) {
    setSelectedForm(event.target.value);
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
  name_section.rowElements[0][0].elementHeader = elementName;
  var textarea_section = {
    sectionName: "Feedback",
    sectionText: "",
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
  textarea_section.rowElements[0][0].elementHeader = elementName;
  var dropdown_section = {
    sectionName: "How",
    sectionText: "",
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
  dropdown_section.rowElements[0][0].elementHeader = elementName;
  var checkbox_section = {
    sectionName: "Recommend",
    sectionText: "",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "Recommend",
          elementType: "Checkbox",
          elementHeader: "",
          size: "4",
          options: ["Yes", "Maybe", "No"],
        },
      ],
    ],
  };
  checkbox_section.rowElements[0][0].elementHeader = elementName;

  var radio_section={
    sectionName: "test",
    sectionText: "",
    sectionFont: "12",
    numRows: "1",
    rowElements: [
      [
        {
          elementName: "Select",
          elementHeader: "RadioTest",
          elementType: "Radio",
          size: "4",
          options: ["Yes", "Maybe", "No"]
        },
      ],
    ],
  }
  radio_section.rowElements[0][0].elementHeader = elementName;
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
    if (name == "Add Radio"){
      target = radio_section;
    }
    setFormComponents([
      ...formComponents,
      <GenerateSection section={target}></GenerateSection>,
    ]);
    setInfoComponents([
      ...infoComponents,
      target
    ]);
    setSaveStatus(false);
  }

  function handleRemoveComponent(index) {
    const updatedComponents = formComponents.filter((_, i) => i !== index);
    const updatedInfoComponents = formComponents.filter((_, i) => i !== index);

    setFormComponents(updatedComponents);
    setInfoComponents(updatedInfoComponents);
    setSaveStatus(false);
  }
  async function saveComponents(){
    console.log(infoComponents)
    // fetch
    let formJson = {
      "formName" : selectedForm,
      "sections" : infoComponents,
      "version" : versionSaveAs
    }
    await axios.post("http://localhost:8080/api/createForm", formJson).then((response )=>{
      console.log(response)
      if(response.status == 201){
        setSaveStatus(true);
        setSaveText('Form saved successfully')
      }else{
        setSaveText('Error saving form')
      }
    } )
  }
  async function loadExistingForms(){
    await axios.get("http://localhost:8080/api/getAllForms").then((response )=>{
      console.log(response.data)
      let data = response.data
      setAvailableForms(data.map(form => form.formName + " v" + form.version))});
  }
  async function loadSelectedForm(formName){
    await axios.get("http://localhost:8080/api/getFormByName/" + formName).then((response )=>{
      console.log(response.data)
      let data = response.data
      setInfoComponents(data.sections)
      setFormComponents(data.sections.map(target =>  <GenerateSection section={target}></GenerateSection>))
  })
  }
  // setInterval(loadExistingForms, 5000);

  /*
The expression (_, i) is the parameter list of an arrow function that's passed to the filter method. The filter method creates a new array with all elements that pass the test implemented by the provided function.

In this specific case, the _ variable is a throwaway variable that represents the current element being iterated over in the formComponents array. It's being used here to ignore the value of the current element, as we only care about the index of the element.

The i variable represents the index of the current element being iterated over in the formComponents array.
*/

  return (
    <div className="container">
      <FormSelector forms={availableForms} onChange={handleLoadForm} loadForms={loadExistingForms}/>
      <div className="button-container">
      <Button className="centered-button" onClick={() => loadSelectedForm(selectedForm)} text={"Load Form"} color="lightgreen"/>
      </div>
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
    <div>
    </div>
            <div className="button-container">
              <input
                type="text"
                className="centered-textbox"
                placeholder="Enter element name"
                value={elementName}
                onChange={handleInputChange}
              />
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
      <div className="button-container">
        <SaveComponent
          className="centered-button"
          saveComponents={()=> saveComponents()}
          isSaved={isSaved}
          text = {saveText}
        />
        <input type="text" className="centered-textbox" placeholder="Form name" onChange={handleNameSaveAs} style={{margin: 1 + 'em'}}/>
        <input type="text" className="centered-textbox" placeholder="Version number" onChange={handleVersionSaveAs}/>
        
      </div>
    </div>
  
  );
}

export default MyForm;