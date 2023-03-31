import React, { useState, useEffect } from 'react';
import GenerateSectionApproval from './SectionGenerationApprover.js';
import AdminSidebar from './Sidebar/ApproverSidebar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function VendorAssessmentFormApprover() {
  const navigate = useNavigate();

  var [allData, setallData] = useState({}); //All data to save for user
  var [isLoaded, setIsLoaded] = useState(false);
  var [formData, setFormData] = useState(null);
  const [remarks, setRemarks] = useState({})
  //console.log(sessionStorage)
  var formVersion =  sessionStorage.getItem('formVersion')
  var formName = sessionStorage.getItem('formName') || "QLI-QHSP-10-F01 New Vendor Assessment Form";
  var vendor = sessionStorage.getItem('vendorUsername') || "abc@gmail.com";
  var companyInfo = JSON.parse(sessionStorage.getItem("companyInfo")) || "";

  async function getData(formName) {
    try {
      console.log('Sending request...');
      const response = await axios.get(`http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`);
      //console.log('Response received:', response.data);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData(formName);
    loadUserInput(formName, formVersion, vendor);
  }, []); // empty dependency array to run the effect only once

  async function loadUserInput(formName, formVersion, vendor) {
    var inputJson = {
      "formName": formName,
      "username": vendor,
      "formVersion": formVersion,
    }
    //console.log(inputJson)
    await axios
      .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
      .then((response) => {
        if (response.status === 200) {
          setallData(response.data.formInputData[0])
          if(response.data.approverComments[0]){
            setRemarks(response.data.approverComments[0])
          }
          setIsLoaded(true);
        }
      });
    return null
  }

  async function reject(formName, formVersion, username, remarks) {
    
     var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
      "status":"Rejected",
      "formInputData": [allData],
      "companyInfo": companyInfo,
      "approverComments":[remarks]
    }  

    await axios
      .put(`http://localhost:8080/formInput/updateFormInputDataAndStatus`, inputJson)
      .then((response) => {
        alert("Resaved input data!");
        console.log(response.data);
      });
    
  }

  async function approve(formName, formVersion, username, remarks) {
    
    var inputJson = {
     "formName":formName,
     "username":username,
     "formVersion":formVersion,
     "status":"Approved",
     "formInputData": [allData],
     "companyInfo": companyInfo,
     "approverComments":[remarks]
   }  

   await axios
     .put(`http://localhost:8080/formInput/updateFormInputDataAndStatus`, inputJson)
     .then((response) => {
       alert("Resaved input data!");
       console.log(response.data);
     });
   
 }

  const to_return = []

  //console.log(remarks)

  if (formData) {
    var sections = formData['sections']
    //console.log(sections)
    for (let i = 0; i < sections.length; i++) {
      const each_section = sections[i]
      to_return.push(<GenerateSectionApproval remarks = {remarks} setRemarks = {setRemarks} section={each_section} allData = {allData} setallData = {setallData}></GenerateSectionApproval>)
    }}
  
    return (
      <section className='d-flex'>
        <AdminSidebar></AdminSidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> {reject(formName, formVersion, vendor, remarks);navigate("/ApprovalList")}}>Reject</Button>
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> {approve(formName, formVersion, vendor, remarks);navigate("/ApprovalList")}}>Approve</Button>
      </div>
      </section>
    );
}
