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
    const [availableForms, setAvailableForms] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [formRender, setFormRender] = useState(null)
    const [allUsers, setAllUsers] = useState(null)

    var vendorUsers = []
    async function loadVendorUsers(){
      var url = "http://localhost:8080/user/getUserByUserType" 
      await axios.post(url, {"userType": "Vendor"}).then((response) => {
        console.log(response.data);
        // vendorUsers = response.data;
        setAllUsers(response.data);
        setFilteredUsers(response.data);
      })
    }
    async function getAllForms(){
      var url = "http://localhost:8080/api/getAllForms";
      await axios.get(url).then((response) => {
        console.log(response.data);
        var allFormData = response.data;
        setAvailableForms(allFormData);
      })
    }
    const assignForm = async () => {
      var url = "http://localhost:8080/user/updateAssignedFormList";
      const projectIndex = selectedUser.project.findIndex((project) => project == selectedProject);
      var tempSelectedUser = selectedUser;
      tempSelectedUser.project[projectIndex].assignedForm = selectedForms;
      console.log('tempSelectedUser',tempSelectedUser)
      await axios.put(url, selectedUser).then((response) => {
        console.log(response.data);
        setSelectedUser(tempSelectedUser)
      })
      setFormRender(renderSelectedForms())
    }
    useEffect(()=>{
      loadVendorUsers();
      getAllForms();
    },[])
    useEffect(() => {
      setFormRender(renderSelectedForms())
    }, [selectedUser]);

  const handleProjectChange = (event) => {
    console.log("handleProjectChange Event",event.target.value)
    const projectId = event.target.value;
    const userProjects = selectedUser.project;
    const project = userProjects.find((p) => p.projectId === projectId);
    setSelectedProject(project);
    console.log('project',project)
    setSelectedForms(project.assignedForm);
  };

  const handleFormChange = (event) => {
    const formNameVersion = event.target.value;

    if (!selectedProject) return;
      
    console.log('check1')
    const formName = event.target.value.split(" v").slice(0,-1).join("");
    const formVersion = event.target.value.split(" v").slice(-1) ;
    //check if form is already assigned
    var formAlreadyExist = false;
    selectedForms.map(form => {
      if(form.formName == formName && form.formVersion == formVersion) {
        formAlreadyExist = true;
        return;
      }
    })
    if (!formAlreadyExist) {
      var newForm = availableForms.find((form) => form.formName == formName && form.version == formVersion)
      console.log('u picked', newForm)
      var newAssignedForm = {
        formName : newForm.formName,
        formVersion : newForm.version,
        status : "Not started",
        description : "xdd",
      }
      setSelectedForms([...selectedForms, newAssignedForm])
      // project.assignedForm.push(newForm)
    }
    // return {
    //   ...project,
    //   forms: [...project.assignedForm, formNameVersion],
    // };
  }
  
  //   setSelectedUser({ ...selectedUser, projects: updatedProjects });
  // };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    console.log('searchTerm,',searchTerm)
    console.log('allUsers', allUsers)

    const filteredUsers = allUsers.filter(user => user.companyInfo.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filteredUsers);
  };
  const handleRemoveForm = async (projectId, formNameVersion) => {
    const projectIndex = selectedUser.project.findIndex((project) => project.projectId == projectId);
    const formName = formNameVersion.split(" v").slice(0,-1).join("");
    const formVersion = formNameVersion.split(" v").slice(-1) ;
    var tempSelectedUser = selectedUser;
    var filteredForms = tempSelectedUser.project[projectIndex].assignedForm.filter((form) => form.formName !== formName && form.formVersion !== formVersion)
    tempSelectedUser.project[projectIndex].assignedForm = filteredForms
    console.log(tempSelectedUser);
    var url = "http://localhost:8080/user/deleteAssignedForm";
    await axios.put(url, selectedUser).then((response) => {
      console.log(response.data);
      setSelectedUser(tempSelectedUser)
    })
    setFormRender(renderSelectedForms())
  };

  const handleUserFormSubmit = (event) => {
    event.preventDefault();
    console.log(selectedUser,selectedProject, selectedForms);
  };

  const renderProjectOptions = () => {
    return selectedUser.project.map(project => (
      <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
    ));
  };
  
  const renderFormOptions = () => {
    if (!availableForms) return null;
    const projectForms = availableForms
    return projectForms.map(form => (
      <option key={form.formName + " v" + form.version} value={form.formName + " v" + form.version}>{form.formName + " v" + form.version}</option>
    ));
  };

  function renderSelectedForms() {
    console.log('renderSelectedForms')
    if (!selectedUser || !selectedUser.project) return null;
    return selectedUser.project.map((project) => {
      console.log("renderSelectedForms")
      const projectName = project.projectName;
      const userForms = project.assignedForm;
      return (
        <div key={project.projectName} className="project-forms">
          <h4>{projectName}:</h4>
          {userForms.map((form) => (
            <div key={form.formName + " v" + form.formVersion} className="selected-form">
              {form.formName + " v" + form.formVersion}
              <HighlightOffIcon aria-label="delete" onClick={() => handleRemoveForm(project.projectId,form.formName + " v" + form.formVersion)} />
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
    if (filteredUsers.length === 0) {
      return <div>No users found</div>;
    }
  
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
              onClick={() => {setSelectedUser(user);console.log('selected');}}
              className={selectedUser && selectedUser.id === user.id ? 'selected-row' : ''}
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
    <h3>Selected User: {selectedUser.companyName}</h3>
    <form onSubmit={handleUserFormSubmit} className="assign-form">
      
      <div className="form-group">
        <label htmlFor="project">Project:</label>
        <select id="project" value={selectedProject ? selectedProject.registrationNo : ''} onChange={handleProjectChange} className="form-control">
          <option value="">Select a project</option>
          {renderProjectOptions()}
        </select>
      </div>
      {selectedProject && (
        <div className="form-group">
          <label htmlFor="forms">Forms:</label>
          <select id="forms" multiple value={selectedForms.map(form => form.formName + " v" + form.formVersion)} onChange={handleFormChange} className="form-control">
            {renderFormOptions()}
          </select>
        </div>
      )}
      {(selectedUser !== null && "project" in selectedUser && selectedUser.project.length > 0) && (
        <div className="form-group">
          <h3>Selected Forms:</h3>
          <div className="selected-forms">{formRender}</div>
        </div>
      )}
      <Button variant="outlined" type="submit" outline="true" rounded="true" color='success' className="assign-button" onClick={assignForm}>Assign</Button>
    </form>
  </div>
)}
    </div>
    </div>
    </section>
  );
};

export default AssignForm2