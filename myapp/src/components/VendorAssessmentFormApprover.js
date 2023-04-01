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
  var [isUserInputLoaded, setIsUserInputLoaded] = useState(false);
  var [formData, setFormData] = useState(null);
  const [remarks, setRemarks] = useState({})
  //console.log(sessionStorage)
  var formVersion =  sessionStorage.getItem('formVersion')
  var formName = sessionStorage.getItem('formName') 
  var vendor = sessionStorage.getItem('vendorUsername')
  var companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"))
  var projectName = sessionStorage.getItem('projectName') 
  var projectId = sessionStorage.getItem('projectId')

  async function getData(formName) {
    try {
      console.log('Sending request...');
      const response = await axios.get(`http://localhost:8080/api/getFormByNameAndVersion/${formName}/${formVersion}`);
      console.log('Response received:', response.data);
      setFormData(response.data);
      setIsLoaded(true)
    } catch (error) {
      console.error(error);
      setIsLoaded(false)
    }
  }


  async function setDescription(username,projectId,projectName,formName,formVersion,desc) {
    try {
      var inputJson = {
        "username":username,
        "userType":"Vendor",
        "project":[
            {
                "projectId":projectId,
                "projectName":projectName,
                "assignedForm": [
                    {
                    "formName": formName,
                    "description": desc,
                    "formVersion" : formVersion,
                    }
                ]
            }
        ]
    }
      const response = await axios.put(`http://localhost:8080/user/updateAssignedForm`, inputJson);
      if(response.status == 200){
        console.log("Description updated")
        return true
      } else {
        console.log("Description not updated")
        return false
      }
    } catch (error) {
      if(error == "Error: Request failed with status code 404"){
      console.log("Description not updated")}
      return false
    }
  }

   useEffect(() => {
    if (sessionStorage.getItem('userType')!=="Approver"){
      alert("You are not logged in as an Approver")
      navigate('/')
    }
    async function fetchData() {
      try {
          getData(formName);
          var inputJson = {
                "formName": formName,
                "username": vendor,
                "formVersion": formVersion,
              }
          const response = await axios.post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson);
          if(response.status == 200){
            if(response.data.formInputData[0]!==undefined){
              setallData(response.data.formInputData[0]);
            }
            else{
              setallData({});
            }
            if (response.data.status=="Rejected") {
              if(response.data.formInputData[0]!==undefined){
                setRemarks(response.data.approverComments[0]);
              }
            }
            setIsUserInputLoaded(true);         
          } else {
            setIsUserInputLoaded(false);
          }
        } catch (error) {
          if(error == "Error: Request failed with status code 404"){
          setIsUserInputLoaded(false);}
        }
          }   
    fetchData();
  }, []); // empty dependency array to run the effect only once
  

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
    var desc = "This form has been rejected by the approver. Please make the necessary changes and resubmit the form."
    setDescription(username,projectId,projectName,formName,formVersion,desc)
    navigate("/ApprovalList")
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
     var desc = "This form has been approved by the approver."
     setDescription(username,projectId,projectName,formName,formVersion,desc)
     navigate("/ApprovalList")
   
 }

  const to_return = []

  console.log(allData)

  if (formData && isLoaded && isUserInputLoaded) {
    var sections = formData['sections']
    for (let i = 0; i < sections.length; i++) {
      const each_section = sections[i]
      var fillFor = each_section['fillFor']
      to_return.push(<GenerateSectionApproval remarks = {remarks} setRemarks = {setRemarks} section={each_section} allData = {allData} setallData = {setallData} fillFor = {fillFor}></GenerateSectionApproval>)
    }}
  
    return (
      <section className='d-flex'>
        <AdminSidebar></AdminSidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> {reject(formName, formVersion, vendor, remarks)}}>Reject</Button>
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> {approve(formName, formVersion, vendor, remarks)}}>Approve</Button>
      </div>
      </section>
    );
}
