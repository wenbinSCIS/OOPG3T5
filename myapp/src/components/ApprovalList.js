import React, { useState } from 'react';
import Footer from './Footer';
import Totop from './Totop';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import ApproverTable from './ApproverTable';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function ApprovalList() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const data = [
    { companyName: 'ABC Inc.', formName: 'Form 1', requestDate: '2022-01-01' },
    { companyName: 'XYZ Corp.', formName: 'Form 2', requestDate: '2022-02-01' },
    { companyName: '123 Ltd.', formName: 'Form 3', requestDate: '2022-03-01' },
    { companyName: '456 Co.', formName: 'Form 4', requestDate: '2022-04-01' },
    { companyName: '789 LLC', formName: 'Form 5', requestDate: '2022-05-01' },
    { companyName: 'DEF Ltd.', formName: 'Form 6', requestDate: '2022-06-01' },
    { companyName: 'GHI Inc.', formName: 'Form 7', requestDate: '2022-07-01' },
    { companyName: 'JKL Corp.', formName: 'Form 8', requestDate: '2022-08-01' },
    { companyName: 'MNO Ltd.', formName: 'Form 9', requestDate: '2022-09-01' },
    { companyName: 'ABC Inc.', formName: 'Form 10', requestDate: '2022-10-01' },
  ];

  const filteredData = searchText
    ? data.filter((item) =>
        item.companyName.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  return (
    <>
      <section id="hero" className="d-flex">
        <AdminSidebar />
        <div className="container">
          <Header />
          <div className="row">
            <div className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1">
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="text-g" style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>
              Approvals
            </h2>

          </div>
            </div>
            

            <div className="col-lg-6 order-1 order-lg-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <TextField
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                value={searchText}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: 'grey.500' }} />
                  ),
                }}
              />
            </div>
          </div>
          <div className="row">
            <ApproverTable data={filteredData} />
          </div>
        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}