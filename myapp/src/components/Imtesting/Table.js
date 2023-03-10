import Table from 'react-bootstrap/Table';

import React, { useState } from 'react';

function TableComponent(props) {
    const number = `col-md-${props.size}`
    var numRows = props.rows
    var column_headers = props.columnHeaders

    const data = props.data

    // Initialize state for the user input
    //const [data, setData] = useState(() => Array.from({ length: numRows }, () => ({})));

  /* // Handle changes to an input field
  const handleTableChange = (event, rowIndex, column) => {
    const { value } = event.target;
    setData(prevData => {
      return prevData.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [column]: value };
        } else {
          return row;
        }
      });
    });
  }; */

  // Function to add a new row to the table
  /* const addRow = () => {
    setData(prevData => [...prevData, {}]);
  }; */
    return (
        <div className={number}>
        <Table bordered hover >
        <thead>
        <tr>
          {column_headers.map((column,index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data && data.length > 0 && (
          // Generate numRows rows
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {column_headers.map((column,index) => (
                <td key={index}>
                    <input
                      type="text"
                      value={data[rowIndex][column] || ''}
                      onChange={(event) =>
                        props.onChange(event, rowIndex, column,props.name)
                      }
                    />
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
{/* <button onClick={addRow}>Add Row</button> */}