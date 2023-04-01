import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
function ApproverTable({ data }) {
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
  const sendEmail = async (item) => {
    console.log(item)
    const mailDetail = {
      "recipient":item.companyInfo.emailAddress,
      "subject":"Reminder to complete your assigned WorkFlow",
      "msgBody":"Dear valued vendor, please be reminded to"
  }
    try {
      console.log(typeof(mailDetail))
      console.log(typeof(JSON.stringify(mailDetail)))
      const response = await fetch('http://localhost:8080/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          
        },
        body: JSON.stringify(mailDetail)
      });
      
      const result = await response.json();
      alert("Email Sent")
    } catch (error) {
      alert(error)
    }
  }
  

  return (
    <div>
      <MDBTable>
        <MDBTableHead>
          <tr>
    <th className="gray-th">Company Name</th>
    <th className="gray-th">Form Name</th>
    <th className="gray-th">Version</th>
    <th className="gray-th">Status</th>
    <th className="gray-th">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {currentItems.map((item, index) => (
          <tr key={index} className="hover-bg">
            <td>{item.companyName}</td>
            <td>{item.formName}</td>
            <td>{item.formVersion}</td>
            <td>{item.formStatus}</td>
            <td>
              <Button variant="outlined" outline rounded color='success' href={`/vendorApprover`} onClick={()=>{sessionStorage.setItem('formName', item.formName);sessionStorage.setItem('formVersion', item.formVersion);sessionStorage.setItem('companyName', item.companyName);sessionStorage.setItem('companyInfo', JSON.stringify(item.companyInfo));sessionStorage.setItem('vendorUsername', item.vendorUsername)}}>Start</Button>
            </td>
            <td>
              <Button variant="outlined" outline rounded color='success' onClick={() => sendEmail(item)}>
                Send Email
              </Button>
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

export default ApproverTable;