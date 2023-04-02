import Table from "react-bootstrap/Table";

import React, { useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

function TableComponent(props) {
  const number = `col-md-${props.size}`;
  let column_headers = props.columnHeaders || ["Default header"];
  //currently not able to render if column header is null, added default

  const data = props.data;
  return (
    <div className={number}>
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
      <Table bordered hover>
        <thead>
          <tr>
            {column_headers.map((column, index) => (
              <th
                key={index}
                style={{
                  backgroundColor:
                    props.generateFor !== props.fillFor ? "#cbcbcc" : "#eff1f5",
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            // Generate numRows rows
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor:
                    props.generateFor !== props.fillFor ? "#e1e2e3" : "#fafbfc",
                }}
              >
                {column_headers.map((column, index) => (
                  <td key={index}>
                    {props.generateFor !== props.fillFor ? (
                      <h5>{data[rowIndex][column] || ""}</h5>
                    ) : (
                      <input
                        type="text"
                        value={data[rowIndex][column] || ""}
                        onChange={(event) =>
                          props.onChange(event, rowIndex, column, props.name)
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
export default TableComponent;
