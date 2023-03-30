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
import styled from 'styled-components';

const FormCard = ({ formItems }) => {
  const StyledMDBCardTitle = styled(MDBCardTitle)`
  height: 50px; // Adjust this value to set a fixed height, e.g., 300px
`;

var actionWord = "Get Started"

  return (
    <>
      {formItems.map(item => {
        let pillClass = "";
        switch (item.status) {
          case "Not Started":
            pillClass = "bg-danger";
            actionWord = "Get Started";
            break;
          case "In Progress":
            pillClass = "bg-warning";
            actionWord = "Continue";
            break;
          case "Pending Approval":
            pillClass = "bg-primary";
            actionWord = "View Submitted Form";
            break;
          case "Approved":
            pillClass = "bg-success";
            actionWord = "View Submitted Form";
            break;
          case "Pending Review":
            pillClass = "bg-primary";
            actionWord = "View Submitted Form";
            break;
          case "Rejected":
            pillClass = "bg-danger";
            actionWord = "Amend Form";
            break;
          default:
            break;
        }
        return (
          <MDBCard key={item.formName + item.formVersion}>
            <MDBCardImage position='top' alt='...' src={placeholder} />
            <MDBCardBody>
              <StyledMDBCardTitle>{item.formName}</StyledMDBCardTitle>
              <MDBCardText>
                {item.description}
              </MDBCardText>
            </MDBCardBody>
            <MDBListGroup flush>
              <MDBListGroupItem>Status : <span className={`badge rounded-pill ${pillClass}`}>{item.status}</span></MDBListGroupItem>
            </MDBListGroup>
            <MDBCardBody>
              <MDBCardLink href={`/Vendor`} onClick={()=>{sessionStorage.setItem('formName', item.formName);sessionStorage.setItem('formVersion', item.formVersion)}}>{actionWord}</MDBCardLink>
            </MDBCardBody>
          </MDBCard>
        )
      })}
    </>
  );
}
export default FormCard;