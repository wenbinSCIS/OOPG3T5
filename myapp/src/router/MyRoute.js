import { Routes , Route } from "react-router-dom";


import Error from "../components/Error";

import Home from "../components/Home";

import Login from "../components/Login";

export default function MyRoute() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
  
        <Route component={Error} />
      </Routes>
    </>
  );
}
