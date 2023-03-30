import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
<<<<<<< Updated upstream:myapp/src/components/SaveComponent.js
import Button from "./Buttons/Creator";
=======
//import Button from "./Buttons/Creator";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useState } from 'react';
>>>>>>> Stashed changes:myapp/src/components/AdminPageComponents/SaveComponent.js

const SaveComponent = ({ isSaved, saveComponents, text, formsAvailable, isVersionNumberEmpty}) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <div>
          <Button
            color={isSaved ? "lightgrey" : "lightblue"}
            text="Save as "
            onClick={saveComponents}
<<<<<<< Updated upstream:myapp/src/components/SaveComponent.js
          />
=======
          /> */}
          <Button
          alignItems="center"
          variant="contained"
          color="primary"
          onClick={saveComponents}
          disabled={isVersionNumberEmpty}
        >
          <SaveIcon />
          &nbsp; Save Form 
          
        </Button>
>>>>>>> Stashed changes:myapp/src/components/AdminPageComponents/SaveComponent.js
          <span>{text}</span>
        </div>
      )}
    </header>
  );
};

export default SaveComponent;
