import React, { useState } from 'react';
import GenerateRow from './RowGeneration';
import GenerateSection from './SectionGeneration';
import Sidebar from "./Sidebar/Sidebar.js";
import axios from 'axios';

export default function TestPage() {
  const [formName, setFormName] = useState("");
  const [version, setVersion] = useState("");
  const [response, setResponse] = useState([]);

  const handleGetAllForms = () => axios.get(`http://localhost:8080/api/getAllForms`).then(res => {if (Array.isArray(res.data)) {setResponse(res.data);}}).catch(err => {console.log(err);});
  const handleGetFormByName = () => {
    axios.get(`http://localhost:8080/api/getFormByName/${formName}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setResponse(res.data);
        } else {
          setResponse([res.data]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleGetAllFormsByVersion = () => axios.get(`http://localhost:8080/api/getAllFormsByVersion/${version}`).then(res => {if (Array.isArray(res.data)) {setResponse(res.data);}}).catch(err => {console.log(err);});
  const handleCreateForm = () => axios.post(`http://localhost:8080/api/createForm`, {formName: formName, sections: [], version: version}).then(res => {setResponse(res.data);}).catch(err => {console.log(err);});
  const handleUpdateFormByName = () => axios.put(`http://localhost:8080/api/updateFormByName/${formName}`, {formName: formName, sections: [], version: version}).then(res => {setResponse(res.data);}).catch(err => {console.log(err);});
  const handleDeleteFormByName = () => axios.delete(`http://localhost:8080/api/deleteFormByName/${formName}`).then(res => {setResponse([]);}).catch(err => {console.log(err);});

  const handleFormNameChange = (event) => {setFormName(event.target.value);};
  const handleVersionChange = (event) => {setVersion(event.target.value);};

  const formsTable = response.map((form, index) => {
    return (
      <table key={index} className="table table-bordered mt-4">
        <thead>
          <tr>
            <th colSpan="2">{form.formName}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Version</td>
            <td>{form.version}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{form.description}</td>
          </tr>
          <tr>
            <td>Sections</td>
            <td>
              {form.sections.map((section, index) => (
                <GenerateSection key={index} section={section} />
              ))}
            </td>
          </tr>
          <tr>
            <td>Actions</td>
            <td>
              <button className="btn btn-warning mr-2">Edit</button>
              <button className="btn btn-danger" onClick={handleDeleteFormByName}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Test Page</h1>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="formNameInput" className="form-label">Form Name</label>
                  <input type="text" className="form-control" id="formNameInput" value={formName} onChange={handleFormNameChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="versionInput" className="form-label">Version</label>
                  <input type="text" className="form-control" id="versionInput" value={version} onChange={handleVersionChange} />
                </div>
                <button type="button" className="btn btn-primary mb-3" onClick={handleCreateForm}>Create Form</button>
                <button type="button" className="btn btn-danger mb-3" onClick={handleDeleteFormByName}>Delete Form</button>
                <button type="button" className="btn btn-secondary mb-3" onClick={handleUpdateFormByName}>Update Form</button>
              </form>
            </div>
            <div className="col-sm-8">
              <button type="button" className="btn btn-info mb-3" onClick={handleGetAllForms}>Get All Forms</button>
              <div className="mb-3">
                <label htmlFor="formNameInput" className="form-label">Form Name</label>
                <input type="text" className="form-control" id="formNameInput" value={formName} onChange={handleFormNameChange} />
                <button type="button" className="btn btn-success mt-2" onClick={handleGetFormByName}>Get Form By Name</button>
              </div>
              <div className="mb-3">
                <label htmlFor="versionInput" className="form-label">Version</label>
                <input type="text" className="form-control" id="versionInput" value={version} onChange={handleVersionChange} />
                <button type="button" className="btn btn-success mt-2" onClick={handleGetAllFormsByVersion}>Get All Forms By Version</button>
              </div>
              {formsTable}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

/*

Usage Example:
<TestPage />
*/