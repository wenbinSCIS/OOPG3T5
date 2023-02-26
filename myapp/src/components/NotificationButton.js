import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NotificationButton(props) {
  function handleClick() {
    // Handle the notification click event here
    console.log('Notification clicked');
  }

  return (
    <NotificationsIcon onClick={handleClick} style={{ fontSize: 24, marginRight:20 }} />
  );
}

export default NotificationButton;