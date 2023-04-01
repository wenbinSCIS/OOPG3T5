// import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Footer from "./Footer";
import Totop from "./Totop";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import ProgressCircle from "./ProgressCircle";
import StatBox from "./StatBox";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PendingIcon from '@mui/icons-material/Pending';
import ActionTable from './ActionTable';
import axios from "axios";
import React, { useState, useEffect } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import {Routes, Route, useNavigate} from 'react-router-dom';
// import React, { useState, useEffect } from 'react';



export default function Home() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [formStatus, setFormStatus] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem('userType')!=="Vendor"){
      alert("You are not logged in as a Vendor")
      navigate('/')
    }
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/user/getUserByName", {
          username: sessionStorage.getItem("username")
        });
        
        console.log(response.data.project)
        //Get list of formnames and another list of form versions
        var formNames = []
        var formVersions = []
        var formStatuses = []
        var formDescriptions = []
        var formProjectIds = []
        var formProjectNames = []
        for (let i=0 ;i<response.data.project.length;i++){
          for(let j=0 ;j<response.data.project[i].assignedForm.length;j++){
            formNames.push(response.data.project[i].assignedForm[j].formName)
            formVersions.push(response.data.project[i].assignedForm[j].formVersion)
            formDescriptions.push(response.data.project[i].assignedForm[j].description)
            formProjectIds.push(response.data.project[i].projectId)
            formProjectNames.push(response.data.project[i].projectName)
          }
        }
        //Use list of formNames and formVersions to get corresponding formStatuses from formInput
        
        for (let i=0 ;i<formNames.length;i++){
          var inputJson = {
            "formName":formNames[i],
            "username":sessionStorage.getItem("username"),
            "formVersion":formVersions[i]
          }
          //console.log(inputJson)
          try {
            const response = await axios.post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson);
            if (response.status === 200) {
              formStatuses.push(response.data.status)
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              formStatuses.push("Not Started")
            } else {
              console.log(error)
            }
          }
        }
        const formList = [];
        const status = {};
        for (let i = 0; i < formNames.length; i++) {
          if (formStatuses[i] == "Not Started" || formStatuses[i] == "In Progress" || formStatuses[i]=="Rejected") {
            formList.push({
              formName: formNames[i],
              status: formStatuses[i],
              description: formDescriptions[i],
              formVersion: formVersions[i],
              projectId: formProjectIds[i],
              projectName: formProjectNames[i]
            });
          }
          if(formStatuses[i] in status){
            status[formStatuses[i]] += 1;
          }
          else{
            status[formStatuses[i]] = 1;
          }
        }
        setForms(formList);
        setFormStatus(status);
      } catch (error) {
        console.log(error)
      }
      
    };
    fetchData()
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  
  
  const actions = forms;

  console.log(formStatus)
  return (
    <>
    
      <section id="hero" className="d-flex">
      <Sidebar/>
      
        <div className="container">
        <Header/>
          <div className="row">
            <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
              <div>
                
                <h2 className="text-g" style={{ fontWeight : "bold", fontSize: 30, color: 'black'}}>
                  Welcome back, John
                </h2>

              </div>
            </div>

          </div>

          <Box>

{/* GRID & CHARTS */}
<Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)"
  gridAutoRows="140px"
  gap="20px"
>
  {/* ROW 1 */}
  <Box
    gridColumn="span 3"
    backgroundColor="white"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <StatBox
      title={formStatus["Not Started"]|| 0}
      subtitle="Not Started"
      progress={formStatus["Not Started"] / Object.keys(formStatus).length || 0}
      loc = "./UncompletedForms"
      icon={
        <HourglassEmptyIcon
          sx={{ color: "blue", fontSize: "30px" }}
        />
      }
    />
  </Box>
  <Box
    gridColumn="span 3"
    backgroundColor="white"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <StatBox
      title={formStatus["In Progress"]|| 0}
      subtitle="In Progress"
      progress={formStatus["Not Started"] / Object.keys(formStatus).length|| 0}
      loc = "./UncompletedForms"
      icon={
        <HourglassTopIcon
          sx={{ color: "blue", fontSize: "30px" }}
        />
      }
    />
  </Box>
  <Box
    gridColumn="span 3"
    backgroundColor="white"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <StatBox
      title={formStatus["Pending"] || 0}
      subtitle="Pending"
      progress={formStatus["Pending"] / Object.keys(formStatus).length|| 0}
      loc = "./CompletedForms"
      icon={
        <PendingIcon
          sx={{ color: "blue", fontSize: "30px" }}
        />
      }
    />
  </Box>
  <Box
    gridColumn="span 3"
    backgroundColor="white"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <StatBox
      title={formStatus["Rejected"]|| 0}
      subtitle="Rejected"
      progress={formStatus["Rejected"] / Object.keys(formStatus).length|| 0}
      loc = "./CompletedForms"
      icon={
        <CancelIcon
          sx={{ color: "blue", fontSize: "30px" }}
        />
      }
    />
  </Box>
  </Box>
  </Box>          
  <div className="row actionsneed">
  <div>
    <h2 className="text-g" style={{ fontWeight : "bold", fontSize: 30 , color: 'black'}}>
      Actions Needed
    </h2>
  </div>
  <div className="col-lg-12">
    <ActionTable name='formName' actions={actions} />
  </div>
</div>

        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
