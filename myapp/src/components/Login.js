
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}

from 'mdb-react-ui-kit';
import logo from "../assets/img/log.jpg";
import {Routes, Route, useNavigate} from 'react-router-dom';
import backgroundVideo from '../assets/video/videofile3.mp4';


export default function Login() {
    const navigate = useNavigate();

    const navigateToHome = () => {

      navigate('/home');
    };
    return (
        

        <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
            <img src={logo} alt="logo" /></div>
                 <br/>
            
                 <div className="text-center">
              <h4 style={{color:"#64C6CE", fontWeight : "bold"}} className="logo-text">QUANTUM LEAP Portal</h4>
            </div>
            <br/>
            <br/>
            <br/>
            <p>Please login to your account</p>
            <br/>  

            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn onClick={navigateToHome} className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>



          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          

            <video autoPlay loop muted id='video'>
                <source src={backgroundVideo} type ='video/mp4'/>
            </video>

         

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    );

}