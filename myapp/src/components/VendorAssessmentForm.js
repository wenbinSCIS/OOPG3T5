import React, { useState, useEffect } from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { TroubleshootSharp } from '@mui/icons-material';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

export default function VendorAssessmentForm() {

  console.log(sessionStorage)

  const navigate = useNavigate();

  var [allData, setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded, setIsUserInputLoaded] = useState(null);
  var [formData, setFormData] = useState(null);
  const [remarks, setRemarks] = useState({})

  var formVersion =   sessionStorage.getItem('formVersion')||1.1; 
  var formName = sessionStorage.getItem('formName') || "QLI-QHSP-10-F01 New Vendor Assessment Form";
  var username = sessionStorage.getItem('username') || "abc@gmail.com";
  var companyInfo = JSON.parse(sessionStorage.getItem("companyInfo")) || "Company A";

  var [approverComments, setApproverComments] = useState({});

  var url = window.location.href;

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

  // useEffect(() => {
  //   getData(formName); 
  //   async function loadUserInput(formName, formVersion, username) {
  //   var inputJson = {
  //     "formName": formName,
  //     "username": username,
  //     "formVersion": formVersion,
  //   }
  //     await axios
  //     .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setallData(response.data.formInputData[0])
  //         if(response.data.approverComments[0]){
  //           setRemarks(response.data.approverComments[0])
  //         }
  //         setIsUserInputLoaded(true)
  //       }
  //     });
  //   }
  //   await loadUserInput(formName,formVersion,username)
     
  // }, []); // empty dependency array to run the effect only once

  // async function checkUserInputExists(formName, formVersion, username) {
  //   var inputJson = {
  //     "formName": formName,
  //     "username": username,
  //     "formVersion": formVersion,
  //   }
  //     await axios
  //     .post(`http://localhost:8080/formInput/checkIfFormExists`, inputJson)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         axios
  //         .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
  //         .then((response) => {
  //           if (response.status === 200) {
  //             setallData(response.data.formInputData[0])
  //             if(response.data.approverComments[0]){
  //               setRemarks(response.data.approverComments[0])
  //             }
  //           }
  //         });
  //       }
  //     });
  //   }



  // async function loadUserInput(formName, formVersion, username) {
  //   var inputJson = {
  //     "formName": formName,
  //     "username": username,
  //     "formVersion": formVersion,
  //   }
  //     await axios
  //     .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setallData(response.data.formInputData[0])
  //         if(response.data.approverComments[0]){
  //           setRemarks(response.data.approverComments[0])
  //         }
  //       }
  //     });
  //   }




  useEffect(() => {
    async function fetchData() {
      try {
          getData(formName);
          var inputJson = {
                "formName": formName,
                "username": username,
                "formVersion": formVersion,
              }
          const response = await axios.post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson);
          if(response.status == 200){
            setallData(response.data.formInputData[0]);
            setIsUserInputLoaded(true);            
            console.log("User data found")
            if (response.data.hasOwnProperty("approverComments")) {
              setApproverComments(response.data.approverComments[0]);
            }
          } else {
            setIsUserInputLoaded(false);
            console.log("here1")
          }
        } catch (error) {
          console.log(error);
          //setIsUserInputLoaded(false);
          console.log("here2")
        }
          }   
    fetchData();
  }, []); // empty dependency array to run the effect only once
  
    
  


  async function saveUserInput(formName, formVersion, username, companyInfo){
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
          setIsUserInputLoaded(true);
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
  //test
  console.log(isUserInputLoaded)
  if (formData && isUserInputLoaded!=null) {
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