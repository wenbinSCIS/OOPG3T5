import React from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { border } from '@mui/system';

export default function ActionTable({actions }) {
  console.log(actions)

  return (
    <MDBTable align='middle' style={{ width: '100%' }}>
      <MDBTableHead>
        <tr>
          <th scope='col'>Form Name</th>
          <th scope='col'>Version</th>
          <th scope='col'>Description</th>
          <th scope='col' style={{ paddingLeft: '200px' }}>Status</th>
          <th scope='col' style={{ paddingRight:100 }}>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {actions.map((action, index) => {
          let pillClass;
          let actionWord;

          switch (action.status) {
            case "Not Started":
              pillClass = "info";  //turquoise
              actionWord = "Get Started";
              break;
            case "In Progress":
              pillClass = "warning"; //yellow
              actionWord = "Continue";
              break;
            case "Pending Approval": //blue
              pillClass = "primary";
              actionWord = "View Submitted Form";
              break;
            case "Approved": //green
              pillClass = "success";
              actionWord = "View Submitted Form";
              break;
            case "Pending Review"  : //grey
              pillClass = "secondary";
              actionWord = "View Submitted Form";
              break;
            case "Rejected": // red
              pillClass = "danger";
              actionWord = "Amend Form";
              break;
            default:
              break;
          }

          return (
            <tr key={index}>
              <td>{action.formName}</td>
              <td>{action.formVersion}</td>
              <td>{action.description}</td>
              <td style={{ paddingLeft: '200px' }}>
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
                  <Button variant="outline-primary" size="sm" padingTop="5px">
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
