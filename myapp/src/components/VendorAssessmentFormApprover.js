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

  var formName = sessionStorage.getItem('formName') || "";
  var formVersion = sessionStorage.getItem('formVersion') || "";
  var company = sessionStorage.getItem('companyName') || "";
  var user = 'Dew' //get from session storage
  //var user = sessionStorage.getItem('user') || "";


  async function getData(formName, formVersion) {
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
    getData(formName, formVersion);
    loadUserInput(formName, formVersion, company);
  }, []); // empty dependency array to run the effect only once

  async function loadUserInput(formName, formVersion, company) {
    var inputJson = {
      "formName": formName,
      "username": company,
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

  async function reject(formName, formVersion, username) {
    // Call API to update form status
    saveUserInput(formName, formVersion, username)

    var requestBody = {
      username: user,
      vendorForm: [
        {
          formName: formName,
          status: "Pending Approval",
          vendorName: company,
          formVersion: formVersion
        }
      ]
    };
    await axios.put('http://localhost:8080/user/updateAdminVendorFormStatus', requestBody);
    requestBody = {
      username: company,
      assignedForms: [
        {
          formName: formName,
          status: "Pending Approval",
          formVersion: formVersion
        }
      ]
    };
    await axios.put('http://localhost:8080/user/updateVendorAssignedFormStatus', requestBody);
  }
  
  async function approve(formName, formVersion, username) {
    // Call API to update form status
    saveUserInput(formName, formVersion, username)

    console.log(user, formName, formVersion, company)
    var requestBody = {
      username: user,
      vendorForm: [
        {
          formName: formName,
          status: "Approved",
          vendorName: company,
          formVersion: formVersion
        }
      ]
    };
    await axios.put('http://localhost:8080/user/updateAdminVendorFormStatus', requestBody);
    requestBody = {
      username: company,
      assignedForms: [
        {
          formName: formName,
          status: "Approved",
          formVersion: formVersion
        }
      ]
    };
    await axios.put('http://localhost:8080/user/updateVendorAssignedFormStatus', requestBody);
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
  console.log(remarks)

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
      <Button style={{margin: 1 + 'em'}} variant="danger" onClick={()=> reject(formName, formVersion, company)}>Reject</Button>
      <Button variant="success" onClick={()=> approve(formName, formVersion, company)}>Approve</Button>
      </div>
      </section>
    );
}
