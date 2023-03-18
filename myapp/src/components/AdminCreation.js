import React, { useState } from 'react';
import Footer from './Footer';
import Totop from './Totop';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import './AdminCreation.css'; 

export default function AdminCreation() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send username, password, email, and role to backend for processing
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
                  <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <div>
                      <label className="radio-inline" style={{ paddingRight: 10 }}>
                        <input
                          type="radio"
                          name="role"
                          value="Vendor"
                          checked={role === 'Vendor'}
                          onChange={handleRoleChange}
                          />
                          Vendor
                        </label>
                        <label className="radio-inline" style={{ paddingRight: 10 }}>
                          <input
                            type="radio"
                            name="role"
                            value="Admin"
                            checked={role === 'Admin'}
                            onChange={handleRoleChange}
                          />
                          Admin
                        </label>
                        <label className="radio-inline" style={{ paddingRight: 10 }}>
                          <input
                            type="radio"
                            name="role"
                            value="Approver"
                            checked={role === 'Approver'}
                            onChange={handleRoleChange}
                          />
                          Approver
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Create User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <Totop />
      </>
        );
      }