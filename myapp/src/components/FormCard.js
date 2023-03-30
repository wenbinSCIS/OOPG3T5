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
            case "Pending Approval":
            pillClass = "bg-primary";
            break;
          case "Approved":
            pillClass = "bg-success";
            break;
          case "Pending Review":
            pillClass = "bg-primary";
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
              <MDBCardLink href={`/Vendor`} onClick={()=>{sessionStorage.setItem('formName', item.formName);sessionStorage.setItem('formVersion', item.formVersion)}}>Get Started</MDBCardLink>
          
            </MDBCardBody>
          </MDBCard>
        )
      })}
    </>
  );
}
export default FormCard;