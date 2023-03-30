import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
//import Button from "./Buttons/Creator";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

const SaveComponent = ({ isSaved, saveComponents, text, formsAvailable, isVersionNumberEmpty, isFormNameEmpty}) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <div>
          <Button
          alignItems="center"
          variant="contained"
          color="primary"
          onClick={saveComponents}
          disabled={!formsAvailable || isVersionNumberEmpty || isFormNameEmpty}
        >
          <SaveIcon />
          &nbsp; Save Form 
          
        </Button>
          <span>{text}</span>
        </div>
      )}
    </header>
  );
};

export default SaveComponent;

