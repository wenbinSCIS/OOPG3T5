import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const SaveComponent = ({ isSaved, saveComponents, text }) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <div>
          <Button
            color={isSaved ? "lightgrey" : "lightblue"}
            text="Save as "
            onClick={saveComponents}
          />
          <span>{text}</span>
        </div>
      )}
    </header>
  );
};

export default SaveComponent;
