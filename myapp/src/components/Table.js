import Table from 'react-bootstrap/Table';

import React, { useState } from 'react';

function TableComponent(props) {
    const number = `col-md-${props.size}`
    var column_headers = props.columnHeaders
    const data = props.data
    return (
        <div className={number}>
        <Table bordered hover >
        <thead>
        <tr>
          {column_headers.map((column,index) => (
            <th key={index} style={{backgroundColor: props.generateFor === "Approver" ? "#f4dcb7" : "#fff",}}>{column}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data && data.length > 0 && (
          // Generate numRows rows
          data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{backgroundColor: props.generateFor === "Approver" ? "#fdf9f3" : "#fff",}}>
              {column_headers.map((column,index) => (
                <td key={index}>
                  {props.generateFor === "Approver" ? (
                    <h5>{data[rowIndex][column] || ''}</h5>
                  ) : (
                    <input
                      type="text"
                      value={data[rowIndex][column] || ''}
                      onChange={(event) =>
                        props.onChange(event, rowIndex, column,props.name)
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
      </Table>
      </div>
    );
  }
  export default TableComponent;
