import React, { useState, useEffect } from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function VendorAssessmentForm() {

  var [allData, setallData] = useState({}); //All data to save for user
  var [isLoaded, setIsLoaded] = useState(false);
  var [formData, setFormData] = useState(null);
  var [approverComments, setApproverComments] = useState({});

  var formName = sessionStorage.getItem("formName") || "";
  var formVersion = sessionStorage.getItem("formVersion") || "";
  sessionStorage.setItem("username","abc@gmail.com") //Comment out on use
  var user = sessionStorage.getItem("username") || "";

  async function getData(formName) {
    try {
      console.log('Sending request...');
      const response = await axios.get(`http://localhost:8080/api/getFormByName/${formName}`);
      //console.log('Response received:', response.data);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData(formName);
    loadUserInput(formName, formVersion, user);
  }, []); // empty dependency array to run the effect only once

  async function loadUserInput(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
    }
    //console.log(inputJson)
    await axios
      .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
      .then((response) => {
        
        if (response.status === 200) {
          setallData(response.data.formInputData[0])
          if(response.data.approverComments[0]){
            setApproverComments(response.data.approverComments[0])
          }
          setIsLoaded(true);
        }
      });
    return null
  }

  console.log(approverComments)

  async function saveUserInput(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
      "status":"In Progress",
      "formInputData": [allData]
    }
    console.log('isLoaded', isLoaded)
    if (!isLoaded) {
      await axios
        .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
        .then((response) => {
          alert("Saved new input data!");
          setIsLoaded(true);
          console.log(response.data)
        });
    } else {
      await axios
        .put(`http://localhost:8080/formInput/updateFormInputDataAndStatus`, inputJson)
        .then((response) => {
          alert("Resaved input data!");
          console.log(response.data);
        });
    }
  }
  const to_return = []
  //test
  if (formData) {
    var sections = formData['sections']
    
    for (let i = 0; i < sections.length; i++) {
      const each_section = sections[i]
      to_return.push(<GenerateSection comments = {approverComments} section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
    }}
  
    return (
      <section className='d-flex'>
        <Sidebar></Sidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> saveUserInput(formName, formVersion, user)}>Save</Button>
      <Button variant="dark">Submit Form</Button>
      </div>
      </section>
    );
}
