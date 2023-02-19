import React, {useState} from "react";
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

  // const [headers, setHeaders] = useState([]);
  //   headers = Array.from(
  //     document.querySelectorAll('p[style*="color:rgba(0, 95, 241, 1)"]')
  //   ).map((p) => p.innerText);
  //   setHeaders(headers);

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
            Email Address
          </p>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="eg: email@yahoo.com"></Form.Control>
          </Col>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            How did you hear about us?*
          </p>
        </Row>
        <Row className="mb-3">
          <Col>
          <Form.Control as="textarea"style={{ height: "100px" }} />
          </Col>
        </Row>
      </Container>
      <Container style={{ maxWidth: "540px" }} className="mt-5">
      <h5>Element Creator</h5>
      <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Type of Element* 
          </p>
      </Row>
      <Row className="mb-3">
      <Col style={{width: "50%"}}>
        <Form.Select aria-label="Element Creator">
          <option>Select</option>
          <option value="Text">Text</option>
          <option value="TextArea">Text Area</option>
          <option value="Radio">Radio</option>
          <option value="Checkbox">Checkbox</option>
          <option value="Dropdown">Dropdown</option>
        </Form.Select>
      </Col>
      </Row>
      <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Element Name*
          </p>
      </Row>
      <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Label_name"></Form.Control>
          </Col>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Placeholder Text
          </p>
      </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Label_name"></Form.Control>
          </Col>
        </Row>
        <Row className="no-gutters">
          <p style={{ color: "rgba(0, 95, 241, 1)", marginBottom: 2 }}>
            Element Size
          </p>
      </Row>
      <Row className="mb-3">
    <Col style={{width: "50%"}} >
      <Form.Select style={{marginBottom: "150px"}}>
        <option value="4x1">4x1</option>
        <option value="3x2">3x2</option>
      </Form.Select>
    </Col>
    </Row>
    <Row className="mb-3 align-items-center justify-content-end">
  <Col className="d-flex justify-content-end">
    <Button className="btn btn-danger">Insert After Element</Button>
  </Col>
  <Col>
          <Form.Select style={{ width: "150px" }}>
            {/* <option value="">Select a header</option>
            {headers.map((header, index) => (
              <option key={index}>{header}</option>
            ))} */}
            <option value="Fill 1">Fill 1</option>
            <option value="Fill 2">Fill 2</option>
            <option value="Phone Number">Phone Number</option>
            <option value="Email Address">Email Address</option>
          </Form.Select>
        </Col>
</Row>

<Row>
<Col className="d-flex justify-content-end">
    <Button className="btn btn-primary mx-4">Insert At Top</Button>
    <Button className="btn btn-primary">Insert At Bottom </Button>
</Col>
</Row>
</Container>
    </>
  );
};
export default Admin;

