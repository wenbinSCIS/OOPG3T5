import React, { useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import Button from '@mui/material/Button';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const mockUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
  { id: 3, username: 'user3', email: 'user3@example.com' },
  { id: 4, username: 'user4', email: 'user4@example.com' },
  { id: 5, username: 'user5', email: 'user5@example.com' },
  { id: 6, username: 'user6', email: 'user6@example.com' },
  { id: 7, username: 'user7', email: 'user7@example.com' },
  { id: 8, username: 'user8', email: 'user8@example.com' },
  { id: 9, username: 'user9', email: 'user9@example.com' },
  
];

const mockProjects = [
  { id: 1, name: 'Project 1', forms: [1, 2, 3] },
  { id: 2, name: 'Project 2', forms: [4, 5, 6] },
];

const mockForms = [
  { id: 1, name: 'Form 1' },
  { id: 2, name: 'Form 2' },
  { id: 3, name: 'Form 3' },
  { id: 4, name: 'Form 4' },
  { id: 5, name: 'Form 5' },
  { id: 6, name: 'Form 6' },
];

const AssignForm = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedForms, setSelectedForms] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    const project = mockProjects.find((p) => p.id === parseInt(projectId));
    setSelectedProject(project);
    setSelectedForms([]);
  };

  const handleFormChange = (event) => {
    const formId = event.target.value;
    const form = mockForms.find((f) => f.id === parseInt(formId));
    if (!selectedForms.find((f) => f.id === form.id)) {
      setSelectedForms((forms) => forms.concat(form));
    }
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    const filteredUsers = mockUsers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filteredUsers);
  };

  const handleRemoveForm = (formId) => {
    setSelectedForms((forms) => forms.filter((f) => f.id !== formId));
  };

  const handleUserFormSubmit = (event) => {
    event.preventDefault();
    console.log(selectedUser,selectedProject, selectedForms);
  };

  const renderProjectOptions = () => {
    return mockProjects.map(project => (
      <option key={project.id} value={project.id}>{project.name}</option>
    ));
  };

  const renderFormOptions = () => {
    if (!selectedProject) return null;
    const projectForms = selectedProject.forms.map(formId => mockForms.find(f => f.id === formId));
    return projectForms.map(form => (
      <option key={form.id} value={form.id}>{form.name}</option>
    ));
  };
  const renderSelectedForms = () => {
    return selectedForms.map((form) => (
      <div key={form.id} className="selected-form">
        {form.name}
        <HighlightOffIcon aria-label="delete" onClick={() => handleRemoveForm(form.id)}/>
       

      </div>
    ));
  };
  
  const tableStyles = {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '2rem 0',
  };
  
  const thStyles = {
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };
  
  const tdStyles = {
    backgroundColor: '#fff',
    color: '#555',
    padding: '0.75rem',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
  };
  
  const renderFilteredUsers = () => {
    if (filteredUsers.length === 0) {
      return <div>No users found</div>;
    }
  
    return (
      <MDBTable hover style={tableStyles}>
        <MDBTableHead>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Username</th>
            <th style={thStyles}>Email</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredUsers.map(user => (
            <tr
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={selectedUser && selectedUser.id === user.id ? 'selected-row' : ''}
            >
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    );
  };
  return (
    <section id="hero" className="d-flex">
    <AdminSidebar />
    <div className="container">
      <Header/>
    <div className="d-flex">
    <div className="user-list-container pr-3" style={{ width: "65%" }}>

  <div className="user-list-search-container d-flex justify-content-between">
    <div>
      <h3>List of Users:</h3>
     
    </div>
    <div className="ml-3">
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" onChange={handleSearchInputChange} />
    </div>
  </div>
          <div>
          {renderFilteredUsers()}
        </div>
      </div>

      {selectedUser && (
  <div className="d-flex flex-column flex-grow-1">
    <h3>Selected User: {selectedUser.username}</h3>
    <form onSubmit={handleUserFormSubmit} className="assign-form">
      <div className="form-group">
        <label htmlFor="project">Project:</label>
        <select id="project" value={selectedProject ? selectedProject.id : ''} onChange={handleProjectChange} className="form-control">
          <option value="">Select a project</option>
          {renderProjectOptions()}
        </select>
      </div>
      {selectedProject && (
        <div className="form-group">
          <label htmlFor="forms">Forms:</label>
          <select id="forms" multiple value={selectedForms.map(f => f.id)} onChange={handleFormChange} className="form-control">
            {renderFormOptions()}
          </select>
        </div>
      )}
      {selectedForms.length > 0 && (
        <div className="form-group">
          <h3>Selected Forms:</h3>
          <div className="selected-forms">{renderSelectedForms()}</div>
        </div>
      )}
      <Button variant="outlined" type="submit" outline rounded color='success' className="assign-button">Assign</Button>
    </form>
  </div>
)}
    </div>
    </div>
    </section>
  );
};

export default AssignForm;