
import React,{useState} from 'react';
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
import backgroundVideo from '../assets/video/videofile2.mp4';
import axios from "axios";


export default function Login() {
    const navigate = useNavigate();

    const navigateToHome = () => {

      navigate('/home');
    };

    function useInput({ type }) {
      const [value, setValue] = useState("");
      const input = <MDBInput wrapperClass='mb-4' value={value} onChange={e => setValue(e.target.value)} type={type} />;
      return [value, input];
    }

    const [username, usernameInput] = useInput({ type: "email" });
    const [password, passwordInput] = useInput({ type: "password" });
    const [errorMessage,setErrorMessage] = useState("")

    async function tryLogIn() {
      // fetch
      let formJson = {
        username: username,
        passwordString: password,
      };
      await axios
        .put("http://localhost:8080/user/userLogIn", formJson)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            let curUsername = response.data.username;
            sessionStorage.setItem("username",curUsername);

            let userType = response.data.userType;
            sessionStorage.setItem("userType",response.data.userType);

            if (userType==="Vendor")
            {
              navigate("/home")
            }
            else if (userType==="AdministrativePersonnel")
            {
              navigate("/AdminApprovalList")
            }
            else if(userType==="Approver")
            {
              navigate("/ApprovalList")
            }
          }
        }).catch(function(error){
          if (error.response.status<500 && error.response.status>=400)
          {
            setErrorMessage("Login failed. Please check if you username and password are correct.")
          }
          else if (error.response.status >= 500)
          {
            setErrorMessage("A connection error has occured. Please try again later.")
          }
          else
          {
            setErrorMessage("An unknown error has occured. Please try again later.")
          }
        });
      }

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
            <label htmlFor='form1'>Email address</label>
            {usernameInput}

            <label htmlFor='form2'>Password</label>
            {passwordInput}
            <p style={{color:"red",fontStyle: "italic"}}>{errorMessage}</p>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn onClick={tryLogIn} className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
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