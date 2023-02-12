import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import React from "react";
import MyRoute from "./router/MyRoute";
import Login from "./components/Login";
const setStyle = (e) => {
  const menu = document.getElementById("menubar"),
    top = document.getElementById("totop");
  let b = document.body;
  let d = document.documentElement;
  let flag = false;
  d = d.clientHeight ? d : b;
  if (d.scrollTop === 0) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag === true) {
    if (menu !== null) menu.classList.add("menubar-scrolled");
    if (top !== null) top.classList.add("to-top-visible");
  } else {
    if (menu !== null) menu.classList.remove("menubar-scrolled");
    if (top !== null) top.classList.remove("to-top-visible");
  }
};
window.onscroll = setStyle;

export default function App() {
  return (
    <>
      <Router>
        <Login />
      </Router>
    </>
  );
}
