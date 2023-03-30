import React from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

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
          <th scope='col' style={{ display: 'flex', flexDirection: 'row-reverse', paddingRight:100 }}>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {actions.map((action, index) => (
          <tr key={index}>
            <td>{action.formName}</td>
            <td>{action.formVersion}</td>
            <td>{action.description}</td>
            <td style={{ paddingLeft: '200px' }}>
              <MDBBadge color={action.status === 'Active' ? 'success' : 'danger'} pill>
                {action.status}
              </MDBBadge>
            </td>
            <td style={{ display: 'flex', flexDirection: 'row-reverse', paddingRight:100 }}>

                <Link to="/Vendor" onClick={() => {
                  sessionStorage.setItem('formName', action.formName);
                  sessionStorage.setItem('formVersion', action.formVersion);
                }}>
                  <Button variant="outlined">
                    Start
                  </Button>
                </Link>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
