import React, { useState , useEffect, version} from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function UserForm() {
  var [allData , setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded , setIsUserInputLoaded] = useState(false);
  var [isUserFormLoaded , setIsUserFormLoaded] = useState(false);

  var [formData, setFormData] = useState(null);
  //var [toReturn, setToReturn] = useState([]);

  var [approverComments, setApproverComments] = useState({ //get from API Future
    "'Company Info'": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    "Evaluation": "this sucks"
});

  var url = window.location.href;
  var formVersion = localStorage.getItem('formVersion') || 1;
  var formName = localStorage.getItem('formName') || "QLI-QHSP-10-F01 New Vendor Assessment Form";
  var username = localStorage.getItem('username') || "Nico";

  async function getData(formName) {
    try {
      console.log('Sending request...');
      const response = await axios.get(`http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`);
      console.log('Response received:', response.data);
      setFormData(response.data);//?
      if(response.status === 200){
        setIsUserFormLoaded(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(!isUserFormLoaded){
      getData(formName)}
      loadUserInput(formName, formVersion, username);
  }, []); // empty dependency array to run the effect only once


  
  // async function fetchFormData() {
  //   var getUrl = `http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`;
  //   console.log('getUrl',getUrl)
  //   await axios.get(`http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`).then((response)=>{
  //     console.log('response.data',response.data);
  //     setFormData(response.data);
      
      
      
  //   });
  // };
  // fetchFormData()
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
          setIsUserInputLoaded(true);
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
    console.log('isUserInputLoaded', isUserInputLoaded)
    if (!isUserInputLoaded){
      await axios
      .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
      .then((response) => {
        setIsUserInputLoaded(true);
        alert("Saved new input data!");
        console.log(response.data);
      });
    }else{
      await axios
      .put(`http://localhost:8080/formInput/updateFormInputData`, inputJson)
      .then((response) => {
        alert("Resaved input data!");
        console.log(response.data);
      });
    }
  }

  const to_return = []

  if (formData) {
    var sections = formData['sections']
    console.log(sections)
    for (let i = 0; i < sections.length; i++) {
      const each_section = sections[i]
      to_return.push(<GenerateSection comments = {approverComments} section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
    }}
  else{
    alert("Form not found")
  }
    return (
      <section className='d-flex'>
        <Sidebar></Sidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> saveUserInput(formName, formVersion, "Nico")}>Save</Button>
      <Button variant="dark">Submit Form</Button>
      </div>
      </section>
    );
}
