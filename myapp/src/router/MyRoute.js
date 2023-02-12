import { Routes , Route } from "react-router-dom";


import Error from "../components/Error";

import Home from "../components/Home";
import Main from "../components/Main";

export default function MyRoute() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/home" element={<Home/>} />

        <Route component={Error} />
      </Routes>
    </>
  );
}
