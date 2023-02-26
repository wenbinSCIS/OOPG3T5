import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const SaveComponent = ({ isSaved, saveComponents }) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <Button
          color={isSaved ? "lightgrey" : "lightblue"}
          text="Save form"
          onClick={saveComponents}
        />
      )}
    </header>
  );
};

export default SaveComponent;
