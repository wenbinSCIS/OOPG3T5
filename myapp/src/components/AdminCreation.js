import React, { useState } from 'react';
import Footer from './Footer';
import Totop from './Totop';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import './AdminCreation.css';
import axios from "axios";

export default function AdminCreation() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');
const [email, setEmail] = useState('');
const [companyName, setCompanyName] = useState('');
const [registrationNumber, setRegistrationNumber] = useState('');
const [businessNature, setBusinessNature] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [gstNumber, setGstNumber] = useState('');

const handleUsernameChange = (event) => {
setUsername(event.target.value);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};

const handleRoleChange = (event) => {
setRole(event.target.value);
};

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handleCompanyNameChange = (event) => {
setCompanyName(event.target.value);
};

const handleRegistrationNumberChange = (event) => {
setRegistrationNumber(event.target.value);
};

const handleBusinessNatureChange = (event) => {
setBusinessNature(event.target.value);
};

const handlePhoneNumberChange = (event) => {
setPhoneNumber(event.target.value);
};

const handleGstNumberChange = (event) => {
setGstNumber(event.target.value);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("http://localhost:8080/user/createUser",{
      "username": username,
      "passwordString": password,
      "userType": role,
      "project":[],
      "companyInfo":{
        "companyName": companyName,
        "registrationNo": registrationNumber,
        "contactNo": phoneNumber,
        "emailAddress":email,
        "natureOfBusiness": businessNature,
        "gSTNo": gstNumber
        }
      }
    )
    alert("Account creation successful")
    window.location.reload()
  } catch (error) {
    alert("Account creation failed")
    console.log(error.config.data)
  }
  
  // const formData = {
  //   username: username,
  //   password: password,
  //   role: role,
  //   email: email,
  //   companyName: companyName,
  //   registrationNumber: registrationNumber,
  //   businessNature: businessNature,
  //   phoneNumber: phoneNumber,
  //   gstNumber: gstNumber
  // };
  // console.log(formData)
  // use formData to call backend
  
  
};

return (
<>
      <section id="hero" className="d-flex">
      <AdminSidebar />
      <div className="container">
      <Header />
      <div className="row">
      <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
      <div className="account-creation">
      <h2 className="text-g" style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>Account Creation</h2>
      <form onSubmit={handleSubmit} className="account-creation-form">
      <div className="form-group input-group">
      <div className="input-group-prepend">
      <span className="input-group-text">
      <i className="fas fa-user"></i>
      </span>
      </div>
      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                      />
      </div>
      
      <div className="form-group input-group">
      <div className="input-group-prepend">
      <span className="input-group-text">
      <i className="fas fa-lock"></i>
      </span>
      </div>
      <input
      type="password"
      className="form-control"
      id="password"
      placeholder="Password"
      value={password}
      onChange={handlePasswordChange}
      />

      </div>
      <div className="form-group input-group">
      <div className="input-group-prepend">
      <span className="input-group-text">
      <i className="fas fa-users"></i>
      </span>
      </div>
      <select
      className="form-control"
      id="role"
      value={role}
      onChange={handleRoleChange}
      >
      <option value="">Select Role</option>
      <option value="AdministrativePersonnel">AdministrativePersonnel</option>
      <option value="Approver">Approver</option>
      <option value="Vendor">Vendor</option>
      </select>
      </div>
      {role === 'Vendor' && (
   <>
      <div className="form-group input-group">
      <div className="input-group-prepend">
      <span className="input-group-text">
      <i className="fas fa-envelope"></i>
      </span>
      </div>
      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                      />
      </div>
      <div className="form-group input-group">
         <div className="input-group-prepend">
            <span className="input-group-text">
               <i className="fas fa-building"></i>
            </span>
         </div>
         <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Company Name"
            value={companyName}
            onChange={handleCompanyNameChange}
         />
      </div>
      <div className="form-group input-group">
         <div className="input-group-prepend">
            <span className="input-group-text">
               <i className="fas fa-id-card"></i>
            </span>
         </div>
         <input
            type="text"
            className="form-control"
            id="registrationNumber"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={handleRegistrationNumberChange}
         />
      </div>
      <div className="form-group input-group">
         <div className="input-group-prepend">
            <span className="input-group-text">
               <i className="fas fa-clipboard-list"></i>
            </span>
         </div>
         <input
            type="text"
            className="form-control"
            id="businessNature"
            placeholder="Business Nature"
            value={businessNature}
            onChange={handleBusinessNatureChange}
         />
      </div>
      <div className="form-group input-group">
         <div className="input-group-prepend">
            <span className="input-group-text">
               <i className="fas fa-phone"></i>
            </span>
         </div>
         <input
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
         />
      </div>
      <div className="form-group input-group">
         <div className="input-group-prepend">
            <span className="input-group-text">
               <i className="fas fa-file-invoice"></i>
            </span>
         </div>
         <input
            type="text"
            className="form-control"
            id="gstNumber"
            placeholder="GST Number"
            value={gstNumber}
            onChange={handleGstNumberChange}
         />
      </div>
   </>
)}

      <button type="submit" className="btn btn-primary btn-block">Create Account</button>
      </form>
      </div>
      </div>
      </div>
      </div>
      </section>
      <Totop />
      <Footer />
      </>
        );
      }
