import React, { useState, useEffect } from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import AdminSidebar from './Sidebar/AdminSidebar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from "./Header";
export default function VendorAssessmentForm() {
  const navigate = useNavigate();

  var [allData, setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded, setIsUserInputLoaded] = useState(false);
  var [formData, setFormData] = useState(null);
  const [status, setStatus] = useState(null)

  //console.log(sessionStorage)
  if (sessionStorage.getItem('userType')==='Vendor'){
    var username = sessionStorage.getItem('username') 
  } else {
    var username = sessionStorage.getItem('vendorUsername') 
  }
  var formVersion =   sessionStorage.getItem('formVersion')
  var formName = sessionStorage.getItem('formName')
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
              console.log(inputJson)
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

    if (sessionStorage.getItem('userType')==="Vendor"){
      var inputJson = {
        "formName":formName,
        "username":username,
        "formVersion":formVersion,
        "status":"In Progress",
        "formInputData": [allData],
        "companyInfo": companyInfo
      }
    } else {
      var inputJson = {
        "formName":formName,
        "username":username,
        "formVersion":formVersion,
        "status":"Pending Approval",
        "formInputData": [allData],
        "companyInfo": companyInfo
      }
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
    if (sessionStorage.getItem('userType')=="Vendor"){
      navigate("/UncompletedForms")
    } else {
      navigate("/AdminApprovalList")
    }  
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
            if(allData[element["elementName"]] == undefined ){
              console.log(element["elementName"] + "Undefined")
              returnAlerts.push(<a style={{color:"red", fontSize:"15px", fontStyle: "italic"}}>{"*"+element["elementName"]+" is compulsory, please fill it in"}</a>)
              returnAlerts.push(<br/>)
            }
            else if(allData[element["elementName"]]=="" || allData[element["elementName"]]==null){
              console.log(element["elementName"] + "empty or null")
              returnAlerts.push(<a style={{color:"red", fontSize:"15px", fontStyle: "italic"}}>{"*"+element["elementName"]+" is compulsory, please fill it in"}</a>)
              returnAlerts.push(<br/>)
            }
            else{ // table checker
              let counter = 0;
              for(let x=0;x<allData[element["elementName"]].length;x++){
                if (Object.keys(allData[element["elementName"]][x]).length == 0){
                  counter+=1
                }
                else{
                  let innerCounter = 0;
                  for(let key in allData[element["elementName"]][x]){
                    if(allData[element["elementName"]][x][key] == "" || allData[element["elementName"]][x][key] == null){
                      innerCounter+=1
                      console.log(innerCounter)
                    }
                }
                if(innerCounter == Object.keys(allData[element["elementName"]][x]).length){
                  counter+=1
                }
              }
              if(counter==allData[element["elementName"]].length){
                returnAlerts.push(<a style={{color:"red", fontSize:"15px", fontStyle: "italic"}}>{"*"+element["elementName"]+" is compulsory, please fill it in"}</a>)
                returnAlerts.push(<br/>)
              }
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
              if (sessionStorage.getItem('userType')=="Vendor"){
                navigate("/CompletedForms")
              } else {
                navigate("/AdminApprovalList")
              }  
              setIsUserInputLoaded(true);
              console.log(response.data);
            });
        } else {
          await axios
            .put(`http://localhost:8080/formInput/updateFormInputDataAndStatus`, inputJson)
            .then((response) => {
              alert("Resaved input data!");
              if (sessionStorage.getItem('userType')=="Vendor"){
                navigate("/CompletedForms")
              } else {
                navigate("/AdminApprovalList")
              }  
              console.log(response.data);
            });
        }
      }
    }    
  }


  const to_return = []

  console.log(allData)
  if (formData && isUserInputLoaded!=null) {
    var sections = formData['sections']
    for (let i = 0; i < sections.length; i++) {
      const each_section = sections[i]
      var fillFor = each_section['fillFor']
      var generateFor = sessionStorage.getItem("userType")
      to_return.push(<GenerateSection comments = {approverComments} section={each_section} allData = {allData} setallData = {setallData} fillFor = {fillFor} generateFor = {generateFor}></GenerateSection>)
    }}
  return (
    <section id="hero" className='d-flex' >
      {sessionStorage.getItem('userType')==='Vendor' ? (<Sidebar ></Sidebar>):(<AdminSidebar />)}

      
      <div className="container-fluid">
        <Header/>
        <div className="container" style={{border:"1px grey", borderStyle: "ridge",  minHeight:"100vh",backgroundColor: "#f9f9fb"}}>
        
          {to_return}
          {alerts}
          {(status === "Pending Approval" || status === "Approved") && sessionStorage.getItem('userType')=="Vendor" ? (
              <Button style={{margin: 1 + 'em'}} variant="dark" onClick={() => {navigate("/completedForms")}}>Exit</Button>
            ) : (
              <>
                <Button style={{margin: 1 + 'em'}} variant="dark" onClick={() => {saveUserInput(formName, formVersion, username, companyInfo)}}>Save</Button>
                <Button  variant="dark" onClick={() => {submit(formName, formVersion, username, companyInfo)}}>Submit Form</Button>
              </>
            )}  
        </div>
      </div>
                
      
    </section>
  );
  
}