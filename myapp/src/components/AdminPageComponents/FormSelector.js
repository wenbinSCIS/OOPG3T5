import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";

const FormSelector = ({ forms, loadForms , onChange}) => {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/testadmin" && (
        <div>
          {/* <div className="button-container">
            {" "}
            <select onClick={loadForms} onChange={onChange}>
              <option value="">Select a Form to load</option>
              {forms.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div> */}
          <Form>
            <Form.Group
              controlId="placeholderPosition"
              // className="mb-3"
              style={{width: "200px" ,margin: "0 auto" }}
            >
              <Form.Select
                aria-label="Default select example"
                defaultValue="Select a form to Load"
                onChange={onChange}
                onClick={loadForms}
              >
                <option key="Choose a Row" value="Choose a Row">
                  Select a form to Load
                </option>
                {forms.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      )}
    </header>
  );
};

export default FormSelector;
