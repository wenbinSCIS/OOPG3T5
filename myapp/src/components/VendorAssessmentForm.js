import React, { useState, useEffect } from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { TroubleshootSharp } from '@mui/icons-material';

export default function VendorAssessmentForm() {

  const navigate = useNavigate();
  var [allData , setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded , setIsUserInputLoaded] = useState(false);
  var [isUserFormLoaded , setIsUserFormLoaded] = useState(false);

  var isUserFormLoaded = false;

  var [formData, setFormData] = useState(null);
  //var [toReturn, setToReturn] = useState([]);

  var [approverComments, setApproverComments] = useState({});

  var url = window.location.href;

  var formVersion = sessionStorage.getItem("formVersion") || "1.1";
  var formName = sessionStorage.getItem("formName") || "QLI-QHSP-10-F01 New Vendor Assessment Form";
  var username = sessionStorage.getItem("username") || "abc@gmail.com";
  var companyInfo = JSON.parse(sessionStorage.getItem("companyInfo")) || "Company A";
  //console.log(companyInfo)

  async function getData(formName) {
    try {
      console.log('Sending request...');
      const response = await axios.get(`http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`);
      //console.log('Response received:', response.data);
      setFormData(response.data);
      setIsUserFormLoaded(true)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try{
      getData(formName);
    }
    catch(error){ 
      console.log(error)
    }
    
    try{
      loadUserInput(formName, formVersion, username);
      setIsUserInputLoaded(true);
    }
    catch(error){
      console.log(error)
    }
  }, []); // empty dependency array to run the effect only once

  async function loadUserInput(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
    }
    //console.log(inputJson)
    await axios
    try{
      const response = await axios.post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson);
      setallData(response.data.formInputData[0])
        if(response.data.approverComments[0]){
          setApproverComments(response.data.approverComments[0])
        }
    }
    catch(error){
      console.log(error)
    }
  }

  //console.log(approverComments)

  async function saveUserInput(formName, formVersion, username, companyInfo){
    console.log(companyInfo)
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
      "status":"In Progress",
      "formInputData": [allData],
      "companyInfo": companyInfo
    }

    if (!isUserInputLoaded){
      await axios
      .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
      .then((response) => {
        setIsUserInputLoaded(true);
        alert("Saved new input data!");
        //console.log(response.data);
      });
    }else{
      await axios
      .put(`http://localhost:8080/formInput/updateFormInputDataAndStatus`, inputJson)
      .then((response) => {
        alert("Resaved input data!");
        console.log(response.data);
      });
    }
  }


  async function submit(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
      "status":"Pending Approval",
      "formInputData": [allData],
      "companyInfo": companyInfo
    }
    if (!isUserInputLoaded) {
      await axios
        .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
        .then((response) => {
          alert("Saved new input data!");
          setIsUserFormLoaded(true);
          console.log(response.data);
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
  console.log(isUserFormLoaded)
  console.log(isUserInputLoaded)
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
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={() => {saveUserInput(formName, formVersion, username, companyInfo); navigate("/UncompletedForms")}}>Save</Button>
      <Button variant="dark" onClick={() => {submit(formName, formVersion, username, companyInfo); navigate("/CompletedForms")}}>Submit Form</Button>
      </div>
      </section>
    );
}
