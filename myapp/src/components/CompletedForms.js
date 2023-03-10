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
          username: "Nico"
        });
        
        var apiResponse = response.data.assignedForms
        var forms = []
        for (let i=0;i<apiResponse.length;i++){
          if (apiResponse[i].status=="Pending Review"||apiResponse[i].status=="Approved"){
            forms.push(apiResponse[i])
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


  const GridContainer = styled(Slider)`
  display: grid;
  grid-template-columns: repeat(3, 1000px);
  grid-gap: 1rem;

  .slick-next {
    right: 0;
    z-index: 1;
  }

  .slick-slide > div {
    padding: 0 10px;
    margin: 1rem;
  }
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
            variant={selectedTag === "Pending Review" ? "contained" : "outlined"}
            onClick={() => setSelectedTag("Pending Review")}
            sx={{ mr: 1, mb: 1 }}
          >
            Pending Review
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
          <GridContainer
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={2}
            slidesToScroll={2}
            nextArrow={<IconButton><ArrowForwardIos /></IconButton>}
          >
            {filteredFormCards.map((formItem) => (
              <div key={formItem.formid}>
                <FormCard formItems={[formItem]} style={{ width: '700px' }} />
              </div>
            ))}
          </GridContainer>
        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
