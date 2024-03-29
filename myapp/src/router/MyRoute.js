import { Routes , Route } from "react-router-dom";


import Error from "../components/Error";

import Home from "../components/Home";

import Login from "../components/Login";

import TestPage from "../components/JEPAGETEST";

import APIFETest from "../components/APIFETest";
import ApprovalList from "../components/ApprovalList";
import AdminApprovalList from "../components/AdminApprovalList";
import AdminCreation from "../components/AdminCreation";
import MyForm from "../components/AdminPageTest";
import AssignForm from "../components/AssignForm";
import VendorAssessmentForm from "../components/VendorAssessmentForm";
import UncompletedForms from "../components/UncompletedForms";
import CompletedForms from "../components/CompletedForms";
export default function MyRoute() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/UncompletedForms" element={<UncompletedForms/>} />
        <Route exact path="/CompletedForms" element={<CompletedForms/>} />
        <Route exact path="/AdminApprovalList" element={<AdminApprovalList/>} />
        <Route exact path="/ApprovalList" element={<ApprovalList/>} />
        <Route exact path="/AssignForm" element={<AssignForm/>} />
        <Route exact path="/AdminCreation" element={<AdminCreation/>} />
        <Route exact path="/testpage" element={<TestPage/>} /> 
        <Route exact path="/APIFETest" element={<APIFETest/>} /> 
        <Route exact path="/vendor" element={<VendorAssessmentForm/>} />
        <Route exact path="/testadmin" element={<MyForm/>}/> 
        <Route component={Error} />
      </Routes>
    </>
  );
}
