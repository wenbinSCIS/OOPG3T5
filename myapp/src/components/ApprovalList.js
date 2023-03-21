import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Totop from './Totop';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import AdminTable from './AdminTable';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function ApprovalList() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  //var user = sessionStorage.getItem('user') || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/user/getUserByName',
          {
            username: 'Dew',//session storage
          }
        );

        const apiResponse = response.data.vendorForm;
        const forms = apiResponse.map((item) => ({
          companyName: item.vendorName,
          formName: item.formName,
          version: item.formVersion,
        }));

        setData(forms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
                <h2
                  className="text-g"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    color: 'black',
                  }}
                >
                  Approvals
                </h2>
              </div>
            </div>

            <div
              className="col-lg-6 order-1 order-lg-2"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
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
            <AdminTable data={filteredData} />
          </div>
        </div>
      </section>
      <Footer />
      <Totop />
    </>
  );
}
