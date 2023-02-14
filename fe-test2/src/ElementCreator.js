import React from "react";
// import './App.css';
import {
  Container,
  Navbar,
  Form,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";

let ElementCreator = () => {
  return (
    <>
      <Navbar
        className="mb-5"
        expand="sm"
        variant="dark"
        style={{ backgroundColor: "rgba(86, 113, 255, 1)" }}
      >
        <Container style={{ maxWidth: "540px" }}>
          <Navbar.Brand>Element Creator</Navbar.Brand>
          {/* <Navbar.Brand href="/">React Bootstrap</Navbar.Brand> */}
          <Button type="submit">Save</Button>
        </Container>
      </Navbar>
      </>
  );
};

export default ElementCreator;