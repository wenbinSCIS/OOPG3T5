import React from 'react';
import  pp  from "../assets/img/profilepic.png";
import NotificationButton from "./NotificationButton";
function Header() {
  return (
    <div style={headerStyle}>
      <div style={profileStyle}>
      <NotificationButton/>
      <img src={pp} alt="Profile" style={{ height: 50, width: 50, borderRadius: "50%" }} />
        
      </div>
    </div>
  );
}

const headerStyle = {
  height: '50px',
  backgroundColor: 'white',
  padding: '50px 20px',

};

const profileStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '100%',
};

export default Header;