import React, { useState , useEffect} from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function VendorAssessmentForm() {

var [allData , setallData] = useState({}); //All data to save for user
var [isLoaded , setIsLoaded] = useState(false);

var formName = "VendorAssessment" //Get from session storage instead

var [formData, setFormData] = useState(null);

useEffect(() => {
  loadForm(formName);
}, []); // empty dependency array to run the effect only once
async function loadForm(formName){
  await axios
    .get(`http://localhost:8080/api/getFormByName/${formName}`)
    .then((response) => {
      console.log(response.data);
      if (response.status === 200){ 
        setFormData(response.data) 
      }
    });
  return null
} 

   useEffect(() => {
    loadUserInput("testFormName2", 1, "testUsername1");
  }, []); // empty dependency array to run the effect only once
  async function loadUserInput(formName, formVersion, username){
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
    }
    await axios
      .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200){ 
          setallData(response.data.formInputData[0]) 
          setIsLoaded(true);
        }
      });
    return null
  } 
 
  async function saveUserInput(formName, formVersion, username){
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
      "formInputData": [allData]
    }
    console.log('isLoaded', isLoaded)
    if (!isLoaded){
      await axios
      .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
      .then((response) => {
        console.log(response.data);
      });
    }else{
      await axios
      .put(`http://localhost:8080/formInput/updateFormInputData`, inputJson)
      .then((response) => {
        console.log(response.data);
      });
    }
  }
  
    const to_return = []

    var sections = formData['sections']
    for(let i=0;i<sections.length;i++){
      const each_section = sections[i]
      to_return.push(<GenerateSection section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
    }
  
    return (
      <section className='d-flex'>
        <Sidebar></Sidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> saveUserInput("testFormName2", 1, "testUsername1")}>Save</Button>
      <Button variant="dark">Submit Form</Button>
      </div>
      </section>
    );
}
