import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
//import Button from "./Buttons/Creator";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

const SaveComponent = ({ isSaved, saveComponents, text }) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <div>
          {/* <Button
            color={isSaved ? "lightgrey" : "lightblue"}
            text="Save as "
            onClick={saveComponents}
          /> */}
          <Button
          alignItems="center"
          variant="contained"
          color="primary"
          onClick={saveComponents}
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
