import React, { useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

function Text(props) {
  const number = `col-md-${props.size}`;
  return (
    <div className={number} style={{ margin: 0, textAlign: props.alignment }}>
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
      <a style={{ fontSize: props.textSize + "px" }} id={props.name}>
        {" "}
        {props.text}
      </a>
    </div>
  );
}
export default Text;
