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

let Admin = () => {
  return (
    <>
      <Navbar
        className="mb-5"
        expand="sm"
        variant="dark"
        style={{ backgroundColor: "rgba(86, 113, 255, 1)" }}
      >
        <Container style={{ maxWidth: "540px" }}>
          <Navbar.Brand>Form Name v1.1</Navbar.Brand>
          {/* <Navbar.Brand href="/">React Bootstrap</Navbar.Brand> */}
          <Button type="submit">Save</Button>
        </Container>
      </Navbar>
      <Container style={{ maxWidth: "540px" }}>
        <Row className="mb-3">
          <h5>Form Name</h5>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Fill 1
          </p>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Input 1"></Form.Control>
          </Col>
          <Col>
            <Form.Control placeholder="Input 2"></Form.Control>
          </Col>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Fill 2
          </p>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control placeholder="Input 1"></Form.Control>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control placeholder="Input 2"></Form.Control>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Form.Control placeholder="Input 3-1"></Form.Control>
          </Col>
          <Col>
            <Form.Control placeholder="Input 3-2"></Form.Control>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Input 4"></Form.Control>
          </Col>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Phone Number
          </p>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="(_ _ _) _ _ _ _ _ _ _ _ _"></Form.Control>
          </Col>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            How did you hear about us?*
          </p>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
