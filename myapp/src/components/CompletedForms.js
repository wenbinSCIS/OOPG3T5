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
          if (formStatuses[i]=="Pending Approval"||formStatuses[i]=="Approved"){
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
                <h2 className="text-g" style={{ fontWeight : "bold", fontSize: 30, color :"black" }}>
                  Completed Forms
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
            variant={selectedTag === "Pending Approval" ? "contained" : "outlined"}
            onClick={() => setSelectedTag("Pending Approval")}
            sx={{ mr: 1, mb: 1 }}
          >
            Pending Approval
          </Button>
          <Button
            variant={selectedTag === "Approved" ? "contained" : "outlined"}
            onClick={() => setSelectedTag("Approved")}
            sx={{ mr: 1, mb: 1 }}
          >
            Approved
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
