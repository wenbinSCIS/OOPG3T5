import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
//import Button from "./Buttons/Creator";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

const SaveComponent = ({ isSaved, saveComponents, text, formsAvailable, isVersionNumberEmpty, isFormNameEmpty, formComponents, updateForm}) => {
  const location = useLocation();
  //console.log(formComponents)
  return (
    <header className="header">
      {location.pathname === "/FormCreation" && (
        <div>
          <Button
          alignItems="center"
          variant="contained"
          color="primary"
          onClick={saveComponents}
          disabled={isVersionNumberEmpty || isFormNameEmpty || formComponents.length === 0}
        >
          <SaveIcon />
          &nbsp; Save New Form 
          
        </Button>
        
          <span>{text}</span>
        </div>
      )}
    </header>
  );
};

export default SaveComponent;

