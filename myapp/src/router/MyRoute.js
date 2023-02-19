import { Routes , Route } from "react-router-dom";


import Error from "../components/Error";

import Home from "../components/Home";

import Login from "../components/Login";

import Pagetest from "../components/JEPAGETEST";

import MyForm from "../components/AdminPageTest";


export default function MyRoute() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/testpage" element={<Pagetest/>} /> 
        <Route exact path="/testadmin" element={<MyForm/>}/> 
        <Route component={Error} />
      </Routes>
    </>
  );
}
