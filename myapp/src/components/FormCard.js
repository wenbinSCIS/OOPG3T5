import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import  placeholder  from "../assets/img/placeholder2.jpg";

const FormCard = ({ formItems }) => {

  return (
    <>
      {formItems.map(item => {
        let pillClass = "";
        switch (item.status) {
          case "Not Started":
            pillClass = "bg-danger";
            break;
          case "In Progress":
            pillClass = "bg-warning";
            break;
          case "Approved":
            pillClass = "bg-success";
            break;
          case "Pending Review":
            pillClass = "bg-warning";
            break;
          default:
            break;
        }
        return (
          <MDBCard key={item.formid}>
            <MDBCardImage position='top' alt='...' src={placeholder} />
            <MDBCardBody>
              <MDBCardTitle>{item.title}</MDBCardTitle>
              <MDBCardText>
                {item.description}
              </MDBCardText>
            </MDBCardBody>
            <MDBListGroup flush>
              <MDBListGroupItem>Status : <span className={`badge rounded-pill ${pillClass}`}>{item.status}</span></MDBListGroupItem>
            </MDBListGroup>
            <MDBCardBody>
              <MDBCardLink href='#'>Get Started</MDBCardLink>
          
            </MDBCardBody>
          </MDBCard>
        )
      })}
    </>
  );
}
export default FormCard;
