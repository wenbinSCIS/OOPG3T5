import { useLocation } from "react-router-dom";

const FormSelector = ({ forms, loadForms , onChange}) => {
  const location = useLocation();

  return (
    <header className="header">

      {location.pathname === "/testadmin" && (
        <div>

          <div className="button-container">
              {" "}
              <select onClick={loadForms} onChange={onChange}>
                <option value="">Select an Form to load</option>
                {forms.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
          </div>
          
        </div>
      )}
    </header>
  );
};

export default FormSelector;
