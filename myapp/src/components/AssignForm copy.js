import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';



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
// var mockUsers = [{
//   "username": "abc@gmail.com",
//   "hashedPassword": "4d09016fe9a256f2a8b731437850f7dcf2278f9b737035172ec92376afcb0c64",
//   "passwordSalt": "IlW2sNyGVLMdlksRoelRW9KLvXqjYk78Jrmxjvtezpw=",
//   "userType": "Vendor",
//   "project": [
//       {
//           "projectId": "safe",
//           "projectName": "safety forms",
//           "assignedForm": [
//               {
//                   "formName": "QLI-QHSP-10-F01 New Vendor Assessment Form",
//                   "status": "In Progress",
//                   "description": "Needs to be completed",
//                   "formVersion": 1.1
//               },
//               {
//                   "formName": "QLI-QHSP-10-F04 Subcontractors Safety _ Health Pre-Evaluation",
//                   "status": "In Progress",
//                   "description": "Needs to be completed",
//                   "formVersion": 1.1
//               }
//           ],
//           "status": "Ongoing"
//       },
//       {
//           "projectId": "Bank",
//           "projectName": "Bankruptcy Forms",
//           "assignedForm": [
//               {
//                   "formName": "Leave of absence",
//                   "status": "Pending Approval",
//                   "description": "Needs to be completed",
//                   "formVersion": 1.1
//               },
//               {
//                   "formName": "Notice of termination",
//                   "status": "In Progress",
//                   "description": "Needs to be completed",
//                   "formVersion": 1.1
//               }
//           ],
//           "status": "Ongoing"
//       }
//   ],
//   "companyInfo": {
//       "companyName": "Company A",
//       "registrationNo": "123456",
//       "contactNo": "91234567",
//       "emailAddress": "companyA@gmail.com",
//       "natureOfBusiness": "Illegal",
//       "gSTNo": "123"
//   }
// }]
const AssignForm2 = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedForms, setSelectedForms] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    var vendorUsers = []
    async function loadVendorUsers(){
      var url = "http://localhost:8080/user/getUserByUserType" 
      await axios.post(url, {"userType": "Vendor"}).then((response) => {
        console.log(response.data);
        vendorUsers = response.data;
        setFilteredUsers(vendorUsers);
      })
    }
    useEffect(()=>{
      loadVendorUsers();
    },[])
    useEffect(() => {
      if (selectedUser && selectedUser.project.length > 0) {
        const userProjects = selectedUser.project[0];
        const userForms = userProjects.assignedForms
        setSelectedForms(userForms);
      } else {
        setSelectedForms([]);
      }
    }, [selectedUser]);

  const handleProjectChange = (event) => {
    const projectName = event.target.value;
    const userProjects = selectedUser.project;
    const project = userProjects.find((p) => p.projectName === projectName);
    setSelectedProject(project);
  };
  // const handleFormChange = (event) => { 
  //   console.log(filteredUsers)
  //   return }
  const handleFormChange = (event) => {
    const formNameVersion = event.target.value;
    if (!selectedUser) return;
    const updatedProjects = selectedUser.projects.map((project) => {
      if (project.projectName === selectedProject.projectName) {
        var formAlreadyExist = false;
        selectedForms.map(form => {
        if(form.formName == formNameVersion) {
          formAlreadyExist = true
        }})
        if (formAlreadyExist) return project; // Skip if the form is already assigned
        return {
          ...project,
          forms: [...project.forms, formNameVersion],
        };
      }
      return project;
    });
  
    setSelectedUser({ ...selectedUser, projects: updatedProjects });
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    const filteredUsers = vendorUsers.filter(user => user.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filteredUsers);
  };

  const handleRemoveForm = (projectId, formId) => {
    const updatedProjects = selectedUser.project.map((project) => {
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
    console.log("renderProjectOptions")
    console.log("selectedProject", selectedProject)
    return selectedUser.project.map(project => (
      <option key={project.id} value={project.id}>{project.name}</option>
    ));
  };

  const renderFormOptions = () => {
    if (!selectedProject) return null;
    console.log("renderFormOptions")
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
  
  function renderFilteredUsers() {
    // if (filteredUsers.length === 0) {
    //   return <div>No users found</div>;
    // }
  
    return (
      <MDBTable hover style={tableStyles}>
        <MDBTableHead>
          <tr>
            <th style={thStyles}>Registration No</th>
            <th style={thStyles}>CompanyName</th>
            <th style={thStyles}>Email</th>
            <th style={thStyles}>Contact</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredUsers.map(user => (
            <tr
              key={user.companyInfo.registrationNo}
              onClick={() => setSelectedUser(user)}
              // className={selectedUser && selectedUser.id === user.id ? 'selected-row' : ''}
            >
              <td>{user.companyInfo.registrationNo}</td>
              <td>{user.companyInfo.companyName}</td>
              <td>{user.companyInfo.emailAddress}</td>
              <td>{user.companyInfo.contactNo}</td>
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
          <select id="forms" multiple value={selectedForms.map(f => f.formName)} onChange={handleFormChange} className="form-control">
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

export default AssignForm2