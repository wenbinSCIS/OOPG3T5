import React, { useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.options[0]);

  function handleValueChange(event) {
    setSelectedValue(event.target.value);
    props.onChange(event);
  }

  const number = `form-group col-md-${props.size} mb-1`;

  const selectWrapperStyle = {
    position: "relative",
    marginLeft: -15,
  };

  const arrowStyle = {
    content: "",
    position: "absolute",
    top: "65%",
    right: "10%",
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: "5px solid #ccc",
  };

  return (
    <div style={{ position: "relative" }}>
      {props.generateFor === "AdminCreation" &&
        props.isFromOtherElement !== true && (
          <IconButton
            onClick={(event) => {
              const newEvent = Object.assign({}, event, {
                target: { value: props.name },
              });
              props.handleDelete(newEvent);
            }}
            sx={{ zIndex: 1 }}
          >
            <HighlightOffIcon
              fontSize="large"
              sx={{ color: "red", marginLeft: -1 }}
            />
          </IconButton>
        )}
      <div className={number} style={selectWrapperStyle}>
        {props.title.length > 0 && (
          <label style={{ margin: 0, color: "black" }}>{props.title}</label>
        )}
        {props.false_header && <br></br>}
        <select
          name={props.name}
          style={{
            backgroundColor:
              props.generateFor !== props.fillFor ? "#e1e2e3" : "#fafbfc",
            cursor:
              props.generateFor !== props.fillFor ? "not-allowed" : "auto",
            pointerEvents:
              props.generateFor !== props.fillFor ? "none" : "auto",
          }}
          className="form-control"
          value={props.data}
          onChange={handleValueChange}
        >
          {props.options.map((option, index) => (
            <option key={option.optionName} value={option.optionValue}>
              {option.optionValue}
            </option>
          ))}
        </select>
        <div style={arrowStyle}></div>
      </div>
    </div>
  );
}

export default Dropdown;
