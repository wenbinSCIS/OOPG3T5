import React, { useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

function Textarea(props) {
  /* const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
      props.onChange(event)
    }; */
  const number = `form-group col-md-${props.size}`;

  return (
    <div className={number} style={{ margin: 0 }}>
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
      <label style={{ margin: 0, color: "black" }}>{props.title}</label>
      <br></br>
      <textarea
        name={props.name}
        key={props.name}
        className="form-control"
        placeholder={props.hint}
        value={props.text}
        onChange={props.onChange}
        rows="4"
        cols="50"
        style={{
          backgroundColor:
            props.generateFor !== props.fillFor ? "#e1e2e3" : "#fafbfc",
          cursor: props.generateFor !== props.fillFor ? "not-allowed" : "auto",
          pointerEvents: props.generateFor !== props.fillFor ? "none" : "auto",
        }}
      ></textarea>
    </div>
  );
}

export default Textarea;
