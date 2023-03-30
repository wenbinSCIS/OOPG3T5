import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import Footer from "./Footer";
import Totop from "./Totop";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import FormCard from "./FormCard";
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowForwardIos } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import axios from "axios";


export default function CompletedForms() {


  const [selectedTag, setSelectedTag] = useState(null);
  const [formCards, setFormCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/user/getUserByName", {
          username: sessionStorage.getItem("username")
        });
        
        //console.log(response)
        //Get list of formnames and another list of form versions
        var formNames = []
        var formVersions = []
        var formStatuses = []
        var formDescriptions = []
        for (let i=0 ;i<response.data.project.length;i++){
          for(let j=0 ;j<response.data.project[i].assignedForm.length;j++){
            formNames.push(response.data.project[i].assignedForm[j].formName)
            formVersions.push(response.data.project[i].assignedForm[j].formVersion)
            formDescriptions.push(response.data.project[i].assignedForm[j].description)
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
        
        var forms = []

        for (let i=0;i<formNames.length;i++){
          if (formStatuses[i]=="Not Started"||formStatuses[i]=="In Progress"){
            forms.push({
              formName:formNames[i],
              status: formStatuses[i],
              description: formDescriptions[i],
              formVersion : formVersions[i],
            })
          }
        }
        
        setFormCards(forms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
  /*
  const formCards = [
    {
      formName: "QLI-QHSP-10-F01 New Vendor Assessment Form",
      status: "Not Started",
      description: "Required to complete",
      formVersion : 1,
    },
    {
      formName: "QLI-QHSP-10-F04 Subcontractors Safety _ Health Pre-Evaluation",
      status: "In Progress",
      description: "Required to complete",
      formVersion : 2,
    },
    {
      formName: "QLI-QHSP-10-F05 Subcontractors Safety _ Health Performance Evaluation",
      status: "Not Started",
      description: "Required to complete",
      formVersion : 3,
    },
  ];
  */
  
  const filteredFormCards = selectedTag
  ? formCards.filter((card) => card.status === selectedTag)
  : formCards;



const FormCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
`;



  return (
    <>
      <section id="hero" className="d-flex">
        <Sidebar />
        <div className="container">
          <Header />
          <div className="row">
            <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
              <div>
                <h2 className="text-g" style={{ fontWeight : "bold", fontSize: 30, color :"black"  }}>
                  Uncompleted Forms
                </h2>

                <div sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
          <Button
            variant={selectedTag === null ? "contained" : "outlined"}
            onClick={() => setSelectedTag(null)}
            sx={{ mr: 1, mb: 1 }}
          >
            All
          </Button>
          <Button
            variant={selectedTag === "Not Started"? "contained" : "outlined"}
            onClick={() => setSelectedTag("Not Started")}
            sx={{ mr: 1, mb: 1 }}
          >
            Not Started
          </Button>
          <Button
            variant={selectedTag === "In Progress" ? "contained" : "outlined"}
            onClick={() => setSelectedTag("In Progress")}
            sx={{ mr: 1, mb: 1 }}
          >
            In Progress
          </Button>
        </div>
              </div>
            </div>
          </div>
          <FormCardsContainer singleForm={filteredFormCards.length === 1}>
  {filteredFormCards.map((formItem) => (
    <div key={formItem.formid} style={{ width: '500px' }}>
      <FormCard formItems={[formItem]} />
    </div>
  ))}
</FormCardsContainer>


        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
