import React, { useState, useEffect } from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Text from './Text.js';
import Header from "./Header";
export default function VendorAssessmentForm() {
  const navigate = useNavigate();

  var [allData, setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded, setIsUserInputLoaded] = useState(false);
  var [formData, setFormData] = useState(null);
  const [status, setStatus] = useState(null)


  var formVersion =   sessionStorage.getItem('formVersion')
  var formName = sessionStorage.getItem('formName')
  var username = sessionStorage.getItem('username') 
  var companyInfo = JSON.parse(sessionStorage.getItem("companyInfo")) 
  var projectName = sessionStorage.getItem('projectName') 
  var projectId = sessionStorage.getItem('projectId') 

  var [approverComments, setApproverComments] = useState({});
  const [alerts, setAlerts] = useState([]);

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
            setStatus(response.data.status);
            setIsUserInputLoaded(true);            
            console.log("User data found")
            if (response.data.status=="Rejected") {
              setApproverComments(response.data.approverComments[0]);
            }
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
  
    
  

console.log(isUserInputLoaded)
  async function saveUserInput(formName, formVersion, username, companyInfo){
    var desc = "Form incomplete, please complete the form"
    setDescription(username,projectId,projectName,formName,formVersion,desc);
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
    //navigate("/UncompletedForms")
  }

  function checkMandatory(formData){
    var returnAlerts = []
    var sections = formData['sections']
    for(let i=0;i<sections.length;i++){
      var aSection = sections[i]["rowElements"]
      for(let j=0;j<aSection.length;j++){
        var elements = aSection[j]
        for(let element of elements){
          if(element["compulsory"]){
            if(element["elementName"] in allData==false ){
              returnAlerts.push(<a style={{color:"red", fontSize:"15px", fontStyle: "italic"}}>{"*"+element["elementName"]+" is compulsory, please fill it in"}</a>)
              returnAlerts.push(<br/>)
            }
            else if(allData[element["elementName"]]=="" || allData[element["elementName"]]==null){
              returnAlerts.push(<a style={{color:"red", fontSize:"15px", fontStyle: "italic"}}>{"*"+element["elementName"]+" is compulsory, please fill it in"}</a>)
              returnAlerts.push(<br/>)
            }
            else{
              let counter = 0;
              for(let x=0;x<element["elementName"].length;x++){
                if (element["elementName"][x] == {}){
                  console.log("here")
                  counter+=1
                }
              }
              if(counter==element["elementName"].length){
                returnAlerts.push(<a style={{color:"red", fontSize:"15px", fontStyle: "italic"}}>{"*"+element["elementName"]+" is compulsory, please fill it in"}</a>)
                returnAlerts.push(<br/>)
              }
            }
          }
        }
        
      }
    }
    setAlerts(returnAlerts)
    if(returnAlerts.length>0){
      return false
    }else{
      return true
  }}
  async function submit(formName, formVersion, username) {
    var inputJson = {
      "formName": formName,
      "username": username,
      "formVersion": formVersion,
      "status":"Pending Approval",
      "formInputData": [allData],
      "companyInfo": companyInfo
    }
    var result = checkMandatory(formData);
    
    if(result){
      var desc = "Form Submitted for Approval"
      var updateDes = setDescription(username,projectId,projectName,formName,formVersion,desc);
      if(updateDes){
        if (!isUserInputLoaded) {
          await axios
            .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
            .then((response) => {
              alert("Saved new input data!");
              navigate("/CompletedForms")
              setIsUserInputLoaded(true);
              console.log(response.data);
            });
        } else {
          await axios
            .put(`http://localhost:8080/formInput/updateFormInputDataAndStatus`, inputJson)
            .then((response) => {
              alert("Resaved input data!");
              navigate("/CompletedForms")
              console.log(response.data);
            });
        }
      }
    }    
  }
  console.log(allData)

  const to_return = []
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
      <Header/>
        {to_return}
        {alerts}
        {status === "Pending Approval" || status === "Approved" ? (
  <Button style={{margin: 1 + 'em'}} variant="dark" onClick={() => {navigate("/completedForms")}}>Exit</Button>
) : (
  <>
    <Button style={{margin: 1 + 'em'}} variant="dark" onClick={() => {saveUserInput(formName, formVersion, username, companyInfo)}}>Save</Button>
    <Button variant="dark" onClick={() => {submit(formName, formVersion, username, companyInfo)}}>Submit Form</Button>
  </>
)}


        
      </div>
      
    </section>
  );
  
}