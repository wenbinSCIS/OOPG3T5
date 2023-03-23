import React, { useState , useEffect, version} from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function UserForm() {
  var [allData , setallData] = useState({}); //All data to save for user
  var [isUserInputLoaded , setIsUserInputLoaded] = useState(false);
  var [isUserFormLoaded , setIsUserFormLoaded] = useState(false);

  var [formData, setFormData] = useState(null);
  var [toReturn, setToReturn] = useState([]);

  
  var url = window.location.href;
  //var formVersion = localStorage.getItem('formVersion') || "";
  //var formName = localStorage.getItem('formName') || "";

  var formVersion = sessionStorage.getItem('formVersion') || "";
  var formName = sessionStorage.getItem('formName') || "";

  
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
    loadUserInput(formName, formVersion, "Company A");//Get username from sessionStorage
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
  async function loadUserInput(formName, formVersion, username){
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
          setIsUserInputLoaded(true);
        }
      });
    return null
  } 

  async function saveUserInput(formName, formVersion, username){
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
      "formInputData": [allData]
    }
    console.log('isUserInputLoaded', isUserInputLoaded)
    if (!isUserInputLoaded){
      await axios
      .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
      .then((response) => {
        console.log(response.data);
      });
    }else{
      await axios
      .put(`http://localhost:8080/formInput/updateFormInputData`, inputJson)
      .then((response) => {
        console.log(response.data);
      });
    }
  }
  
  
  
    return (
      <section className='d-flex'>
        <Sidebar></Sidebar>
      <div className="container">
      {toReturn}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> saveUserInput(formName, formVersion, "Nico")}>Save</Button>
      <Button variant="dark">Submit Form</Button>
      </div>
      </section>
    );
}
