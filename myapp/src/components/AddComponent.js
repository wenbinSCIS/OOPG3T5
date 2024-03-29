import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Buttons/Creator";

const AddComponent = ({ onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close Element Creator (Deprecated)" : "Open Element Creator (Deprecated)"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// AddComponent.defaultProps = {
//   title: "",
// };

// AddComponent.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default AddComponent;
