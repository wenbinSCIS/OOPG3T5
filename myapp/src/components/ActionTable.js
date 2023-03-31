import React from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function ActionTable({ actions }) {

  const getStatusPillColor = (status) => {
    switch (status) {
      case "Not Started":
        return "info"; // turquoise
      case "In Progress":
        return "warning"; // yellow
      case "Pending Approval":
        return "primary"; // blue
      case "Approved":
        return "success"; // green
      case "Pending Review":
        return "secondary"; // grey
      case "Rejected":
        return "danger"; // red
      default:
        return "";
    }
  }

  return (
    <MDBTable align='middle' style={{ width: '100%' }}>
      <MDBTableHead>
        <tr>
          <th scope='col'>Form Name</th>
          <th scope='col'>Version</th>
          <th scope='col'>Description</th>
          <th scope='col' style={{ paddingLeft: '200px' }}>Status</th>
          <th scope='col' style={{ paddingRight: 100 }}>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {actions.map((action, index) => {
          const pillClass = getStatusPillColor(action.status);
          const actionWord =
            action.status === "Not Started" ? "Get Started" : "View Submitted Form";
          return (
            <tr key={index} >
              <td style={{ fontWeight:"bold" }}>{action.formName}</td>
              <td>{action.formVersion}</td>
              <td style={{ color:"grey" }}>{action.description}</td>
              <td style={{ paddingLeft: '200px', fontSize: '1.2rem' }}>
                <MDBBadge color={pillClass}  pill style={{ paddingLeft: '10px' }}>
                  {action.status}
                </MDBBadge>
              </td>
              <td style={{ paddingRight:100 }}>
                <Link to="/Vendor" onClick={() => {
                  sessionStorage.setItem('formName', action.formName);
                  sessionStorage.setItem('formVersion', action.formVersion);
                  sessionStorage.setItem('projectId', action.projectId);
                  sessionStorage.setItem('projectName', action.projectName);
                }}>
                  <Button variant="outline-primary" size="sm"  padingTop="5px">
                    {actionWord}
                  </Button>
                </Link>
              </td>
            </tr>
          )
        })}
      </MDBTableBody>
    </MDBTable>
  );
}
