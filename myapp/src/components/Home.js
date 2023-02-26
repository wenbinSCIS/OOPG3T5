
import { Link } from "react-router-dom";
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

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export default function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
    
      <section id="hero" className="d-flex">
      <Sidebar/>
      
        <div className="container">
        <Header/>
          <div className="row">
            <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
              <div>
                
                <h2 className="text-g" style={{ fontWeight : "bold", fontSize: 30}}>
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
        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
