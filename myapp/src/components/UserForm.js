import React, { useState , useEffect, version} from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function UserForm() {
  const navigate = useNavigate();
  var [allData , setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded , setIsUserInputLoaded] = useState(false);
  var [isUserFormLoaded , setIsUserFormLoaded] = useState(false);

  var [formData, setFormData] = useState(null);
  var [toReturn, setToReturn] = useState([]);

  var [approverComments, setApproverComments] = useState({});

// "'Company Info'": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
//     "Evaluation": "this sucks"




  var url = window.location.href;
  var formVersion = localStorage.getItem('formVersion') || 1;
  var formName = localStorage.getItem('formName') || "QLI-QHSP-10-F01 New Vendor Assessment Form";
  var username = localStorage.getItem('username') || "Nico";

  var formVersion = sessionStorage.getItem("formVersion") || "";
  var formName = sessionStorage.getItem("formName") || "";
  var username = sessionStorage.getItem("username") || "";
  var companyInfo = JSON.parse(sessionStorage.getItem("companyInfo")) || "";
  //console.log(companyInfo)

  useEffect(() => {
    if(!isUserFormLoaded){
      var to_return = []
      //console.log('useeffect?')
      var urlGet = `http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`;
      //console.log('urlGet',urlGet)
      axios.get(urlGet).then((response)=>{
        //console.log('response.data',response.data);
        setFormData(response.data);
        var sections = response.data['sections']
        for(let i=0;i<sections.length;i++){
          const each_section = sections[i]
          to_return.push(<GenerateSection section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
        }
        setToReturn(to_return)
        if(response.status === 200){
          setIsUserFormLoaded(true)
        }
    });
    }
    loadUserInput(formName, formVersion, "abc@gmail.com");//Get username from sessionStorage
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
  async function loadUserInput(formName, formVersion, username, companyInfo){
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
    }
    //console.log(inputJson)
    await axios
      .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200){ 
          setallData(response.data.formInputData[0]) 
          if(response.data.formInputData[0].approverComments){
            setApproverComments(response.data.formInputData[0].approverComments)
          }
          setIsUserInputLoaded(true);
        }
      });
    return null
  } 

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
        console.log(response.data);
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
  
  
  
  return (
    <section className='d-flex'>
      <Sidebar></Sidebar>
      <div className="container">
        {toReturn}
        <Button style={{margin: 1 + 'em'}} variant="dark" onClick={() => {saveUserInput(formName, formVersion, username, companyInfo); navigate("/UncompletedForms")}}>Save</Button>
        <Button variant="dark" onClick={() => {submit(formName, formVersion, username, companyInfo); navigate("/CompletedForms")}}>Submit Form</Button>
      </div>
    </section>
  );
  
}
