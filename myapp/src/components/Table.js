import Table from 'react-bootstrap/Table';

import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

function TableComponent(props) {
    const number = `col-md-${props.size}`
    let column_headers = props.columnHeaders || ['Default header'];
    //currently not able to render if column header is null, added default

    const data = props.data
    return (
        <div className={number}>
           {
          props.generateFor==="Admin" &&
          <CloseButton variant='blue' onClick={props.handleDelete} value={props.name}/>
          }
        <Table bordered hover >
        <thead>
        <tr>
          {column_headers.map((column,index) => (
            <th key={index} style={{backgroundColor: props.generateFor === "Approver" ? "#f4dcb7" : "#eff1f5",}}>{column}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data && data.length > 0 && (
          // Generate numRows rows
          data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{backgroundColor: props.generateFor === "Approver" ? "#fdf9f3" : "#fafbfc",}}>
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
