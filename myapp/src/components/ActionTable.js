import React from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function ActionTable({actions }) {
  return (
    <MDBTable align='middle' style={{ width: '100%' }}>
      <MDBTableHead>
        <tr>
          <th scope='col'>Form Name</th>
          <th scope='col' style={{ paddingLeft: '200px' }}>Status</th>
          <th scope='col' style={{ display: 'flex', flexDirection: 'row-reverse', paddingRight:100 }}>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {actions.map((action, index) => (
          <tr key={index}>
            <td>{action.formName}</td>
            <td style={{ paddingLeft: '200px' }}>
              <MDBBadge color={action.status === 'Active' ? 'success' : 'danger'} pill>
                {action.status}
              </MDBBadge>
            </td>
            <td style={{ display: 'flex', flexDirection: 'row-reverse', paddingRight:100 }}>
              <Link to={`/form${action.formid}`} className='btn btn-link'>
                Start
              </Link>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
