
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
// import React, { useState, useEffect } from 'react';

export default function Home() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
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
        }
        setForms(formList);
      } catch (error) {
        console.log(error)
      }
      
    };
    fetchData()
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //onsole.log(forms)
  /*
  const tempUserJSON = {
    "username": "Nico",
    "hashedPassword": "c1e7a8cf4fdb873ceac220d3f76fefdce2540e8aae816f2e3f3476b51a48ecdb",
    "passwordSalt": "nLgv+NsawHfAgujc/QTU0xM3gfD6cJuDG6h5d7yhp+4=",
    "userType": "Vendor",
    "assignedForms": [
        {
            "formName": "QLI-QHSP-10-F01 New Vendor Assessment Form",
            "status": "Not Started",
            "description": "Required to complete",
            "formVersion": 1.0
        },
        {
            "formName": "QLI-QHSP-10-F04 Subcontractors Safety _ Health Pre-Evaluation",
            "status": "In Progress",
            "description": "Required to complete",
            "formVersion": 2.0
        },
        {
            "formName": "QLI-QHSP-10-F05 Subcontractors Safety _ Health Performance Evaluation",
            "status": "Not Started",
            "description": "Required to complete",
            "formVersion": 3.0
        }
    ]
  }
  const userObject = localStorage.getItem("userObject") || tempUserJSON;
  */
  
  const actions = forms;
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
      title="1"
      subtitle="Not Started"
      progress="0.75"
      loc = "./page1"
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
      title="1"
      subtitle="In Progress"
      progress="0.50"
      loc = "./page2"
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
      title="1"
      subtitle="Completed"
      progress="0.30"
      loc = "./page3"
      icon={
        <CheckCircleOutlineIcon
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
      title="1"
      subtitle="Pending"
      progress="0.80"
      loc = "/page4"
      icon={
        <PendingIcon
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
