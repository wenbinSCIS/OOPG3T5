import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import Button from '@mui/material/Button';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const mockUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com', projects: [
    { id: 1, forms: [1, 2, 3] },
    { id: 2, forms: [1, 5] },
  ]},
  { id: 2, username: 'user2', email: 'user2@example.com', projects: [
    { id: 1, forms: [2, 3] },
  ]},
  { id: 3, username: 'user3', email: 'user3@example.com', projects: [
    { id: 2, forms: [2, 6] },
  ]},
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

    useEffect(() => {
      if (selectedUser) {
        const userProjects = selectedUser.projects;
        const userForms = userProjects.flatMap(project => project.forms.map(formId => mockForms.find(f => f.id === formId)));
        setSelectedForms(userForms);
      } else {
        setSelectedForms([]);
      }
    }, [selectedUser]);
  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    const project = mockProjects.find((p) => p.id === parseInt(projectId));
    setSelectedProject(project);

  };

  const handleFormChange = (event) => {
    const formId = parseInt(event.target.value);
    if (!selectedUser) return;
  
    const updatedProjects = selectedUser.projects.map((project) => {
      if (project.id === selectedProject.id) {
        if (project.forms.includes(formId)) return project; // Skip if the form is already assigned
        return {
          ...project,
          forms: [...project.forms, formId],
        };
      }
      return project;
    });
  
    setSelectedUser({ ...selectedUser, projects: updatedProjects });
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    const filteredUsers = mockUsers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filteredUsers);
  };

  const handleRemoveForm = (projectId, formId) => {
    const updatedProjects = selectedUser.projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          forms: project.forms.filter((id) => id !== formId),
        };
      }
      return project;
    });
  
    setSelectedUser({ ...selectedUser, projects: updatedProjects });
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
    if (!selectedUser || !selectedUser.projects) return null;
  
    return selectedUser.projects.map((project) => {
      const projectName = mockProjects.find((p) => p.id === project.id).name;
      const userForms = project.forms.map(formId => mockForms.find(f => f.id === formId));
  
      return (
        <div key={project.id} className="project-forms">
          <h4>{projectName}:</h4>
          {userForms.map((form) => (
            <div key={form.id} className="selected-form">
              {form.name}
              <HighlightOffIcon aria-label="delete" onClick={() => handleRemoveForm(project.id,form.id)} />
            </div>
          ))}
        </div>
      );
    });
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