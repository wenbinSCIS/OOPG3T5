import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
//import Button from "./Buttons/Creator";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

const UpdateComponent = ({ isSaved, UpdateFormByNameAndVersion, text, formComponents}) => {
    const location = useLocation();
    console.log(formComponents)
    return (
      <header className="header">
        {location.pathname === "/testadmin" && (
          <div>
            <Button
            alignItems="center"
            variant="contained"
            color="primary"
            onClick={UpdateFormByNameAndVersion}
          >
            <SaveIcon />
            &nbsp; Update Existing Form 
            
          </Button>
          
            <span>{text}</span>
          </div>
        )}
      </header>
    );
  };
  
  export default UpdateComponent;
  
  