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

export default function CompletedForms() {

  
  const formCards = [
    {
      title: "QLI-QHSP-10-F01 New Vendor Assessment Form",
      status: "Pending Review",
      description: "Completed",
      formid : 1,
    },
    {
      title: "QLI-QHSP-10-F04 Subcontractors Safety _ Health Pre-Evaluation",
      status: "Approved",
      description: "Completed",
      formid : 2,
    },
    {
      title: "QLI-QHSP-10-F05 Subcontractors Safety _ Health Performance Evaluation",
      status: "Approved",
      description: "Completed",
      formid : 3,
    },
  ];



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
            {formCards.map((formItem) => (
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
