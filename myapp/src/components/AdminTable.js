import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
function AdminTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  

  return (
    <div>
      <MDBTable>
        <MDBTableHead>
          <tr>
          <th className="gray-th">Index</th>
    <th className="gray-th">Company Name</th>
    <th className="gray-th">Form Name</th>
    <th className="gray-th">Version</th>
    <th className="gray-th">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((item, index) => (
            <tr key={index} className="hover-bg">
              <td>{startIndex + index + 1}</td>
              <td>{item.companyName}</td>
              <td>{item.formName}</td>
              <td>{item.version}</td>
              <td>
              <Button variant="outlined" outline rounded color='success' >Start</Button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <MDBRow className="justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <MDBCol key={page} size="1">
            <Button variant="outlined"
              color={currentPage === page ? 'primary' : 'secondary'}
              onClick={() => handlePageChange(page)}
              size="sm"
              
            >
              {page}
            </Button>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}

export default AdminTable;