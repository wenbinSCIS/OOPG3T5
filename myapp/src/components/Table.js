import Table from 'react-bootstrap/Table';

import React, { useState } from 'react';

function TableComponent(props) {
    const number = `col-md-${props.size}`
    var columns = props.columns
    var numRows = props.rows
    var column_headers = props.columnHeaders

    // Initialize state for the user input
    const [data, setData] = useState(() => Array.from({ length: numRows }, () => ({})));

  // Handle changes to an input field
  const handleChange = (event, rowIndex, dataKey) => {
    const newData = [];
    newData[rowIndex][dataKey] = event.target.value;
    setData(newData);
  };
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
                      value={data[rowIndex][index] || ''}
                      onChange={(event) =>
                        handleChange(event, rowIndex, column.dataKey)
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
