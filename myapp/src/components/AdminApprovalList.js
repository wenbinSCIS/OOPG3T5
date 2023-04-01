import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Totop from './Totop';
import AdminSidebar from './Sidebar/AdminSidebar';
import Header from './Header';
import AdminTable from './AdminTable';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";
export default function AdminApprovalList() {
    const [searchText, setSearchText] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };

    useEffect(() => {
    
      // if (sessionStorage.getItem('userType')!="Approver"){
      //   alert("You are not logged in as an Approver")
      //   navigate('/')
      // }
      const fetchData = async () => {
        try {
          var allApproverForms = []
  
          const allForms = await axios.get(
            'http://localhost:8080/formInput/getAllFormInput'
          );
  
          for (let i=0;i<allForms.data.length;i++){
            allApproverForms.push(allForms.data[i])
          }
          
          const forms = allApproverForms.map((item) => ({
            companyName: item.companyInfo.companyName,
            formName: item.formName,
            formVersion: item.formVersion,
            companyInfo:item.companyInfo,
            formStatus:item.status,
            vendorUsername:item.username
          }));
          console.log(forms)
          setData(forms);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

  // const data = [
  //   { companyName: 'ABC Inc.', formName: 'Form 1', status : 'In Progress' },
  //   { companyName: 'XYZ Corp.', formName: 'Form 2', status : 'Not Started' },
  //   { companyName: '123 Ltd.', formName: 'Form 3',status : 'Pending Review'},
  //   { companyName: '456 Co.', formName: 'Form 4',status : 'Pending Approval' },
  //   { companyName: '789 LLC', formName: 'Form 5',status : 'In Progress' },
  //   { companyName: 'DEF Ltd.', formName: 'Form 6', status : 'Rejected' },
  //   { companyName: 'GHI Inc.', formName: 'Form 7',status : 'In Progress' },
  //   { companyName: 'JKL Corp.', formName: 'Form 8',status : 'Approved' },
  //   { companyName: 'MNO Ltd.', formName: 'Form 9',status : 'In Progress'},
  //   { companyName: 'ABC Inc.', formName: 'Form 10', status : 'Approved' },
  // ];

  const filteredData = data.filter((item) =>
  (!searchText || item.companyName.toLowerCase().includes(searchText.toLowerCase())) &&
  (!selectedTag || selectedTag === 'All Forms' || item.status === selectedTag)
);
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
          <div className="tag-buttons">
  {['All Forms','In Progress', 'Not Started', 'Pending Review', 'Pending Approval', 'Rejected', 'Approved'].map((tag) => (
    <Button
      key={tag}
      variant={selectedTag === tag ? 'contained' : 'outlined'}
      onClick={() => setSelectedTag(tag)}
      sx={{ mr: 1, mb: 1 }}
    >
      {tag}
    </Button>
  ))}
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