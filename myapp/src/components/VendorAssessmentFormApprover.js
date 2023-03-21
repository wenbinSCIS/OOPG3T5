import React, { useState, useEffect } from 'react';
import GenerateSectionApproval from './SectionGenerationApprover.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function VendorAssessmentFormApprover() {

  var [allData, setallData] = useState({}); //All data to save for user
  var [isLoaded, setIsLoaded] = useState(false);
  var [formData, setFormData] = useState(null);
  const [remarks, setRemarks] = useState({})

  var formVersion = localStorage.getItem('formVersion') || 1;
  var formName = localStorage.getItem('formName') || "QLI-QHSP-10-F01 New Vendor Assessment Form";
  var username = localStorage.getItem('username') || "Nico";

  async function getData(formName) {
    try {
      console.log('Sending request...');
      const response = await axios.get(`http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`);
      console.log('Response received:', response.data);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData(formName);
    loadUserInput(formName, formVersion, username);
  }, []); // empty dependency array to run the effect only once

  async function loadUserInput(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
    }
    await axios
      .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setallData(response.data.formInputData[0])
          setIsLoaded(true);
        }
      });
    return null
  }

  async function saveUserInput(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
      "formInputData": [allData]
    }
    console.log('isLoaded', isLoaded)
    if (!isLoaded) {
      await axios
        .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
        .then((response) => {
          alert("Saved new input data!");
          setIsLoaded(true);
          console.log(response.data);
        });
    } else {
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
      to_return.push(<GenerateSectionApproval remarks = {remarks} setRemarks = {setRemarks} section={each_section} allData = {allData} setallData = {setallData}></GenerateSectionApproval>)
    }}
  
    return (
      <section className='d-flex'>
        <Sidebar></Sidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> saveUserInput(formName, formVersion, username)}>Save</Button>
      <Button variant="dark">Submit Form</Button>
      </div>
      </section>
    );
}
