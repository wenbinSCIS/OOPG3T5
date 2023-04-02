import rowElementsReact, { useState, useEffect } from "react";
import GenerateRow from "./RowGeneration";

function GenerateSection(props) {
  var allData = props.allData; //useState prop from main
  var setallData = props.setallData; //setState prop from main

  const rows = props["section"]["numRows"];
  console.log(
    "These are the number of rows in Section Generation",
    rows
  );
  const rowElementsFastUpdate = props["section"]["rowElements"]; // compensate for usestate being slow (deprecated - only useful for to return)
  const [rowElements, setRowElements] = useState(
    props["section"]["rowElements"]
  );

  useEffect(() => {
    setRowElements(props.section.rowElements);
  }, [props.section.rowElements]);

  console.log(
    "These are the row elements within Section Generation",
    rowElements
  );
  const to_return = [];
  var sectionText = props["section"]["sectionText"];

  console.log(props.fillFor);

  function handleMoveRowUpSectionGeneration(index) {
    if (index === 0) return; // No-op if the element is already at the top
    const updatedRowState = [...rowElements];
    const temp = updatedRowState[index];
    updatedRowState[index] = updatedRowState[index - 1];
    updatedRowState[index - 1] = temp;
    // rowElements = updatedRowState;
    setRowElements(updatedRowState);
  }

  function handleMoveRowDownSectionGeneration(index) {
    if (index === rowElements.length - 1) return; // No-op if the element is already at the bottom
    const updatedRowState = [...rowElements];
    const temp = updatedRowState[index];
    updatedRowState[index] = updatedRowState[index + 1];
    updatedRowState[index + 1] = temp;
    // rowElements = updatedRowState
    setRowElements(updatedRowState);
  }

  for (let i = 0; i < rows; i++) {
    var curr_row = rowElementsFastUpdate[i];
    to_return.push(
      <GenerateRow
        info={curr_row}
        allData={allData}
        setallData={setallData}
        generateFor={props.generateFor}
        fillFor={props.fillFor}
        handleDelete={props.handleDelete}
        index={i}
        MoveDown={props.MoveDown}
        MoveUp={props.MoveUp}
        MoveDownSG={handleMoveRowDownSectionGeneration}
        MoveUpSG={handleMoveRowUpSectionGeneration}
      ></GenerateRow>
    );
  }
  return (
    <div
      className="row mb-3 pt-3"
      style={{
        backgroundColor:
          props.generateFor !== props.fillFor &&
          (sessionStorage.getItem("userType") == "Vendor"
            ? "#e1e2e3"
            : "#d9dcc7"),
      }}
    >
      <h5>{sectionText}</h5>
      {/* {to_return} */}
      {rowElements.map((currRow, index) => (
        <div key={index}>
          <GenerateRow
            info={currRow}
            allData={allData}
            setallData={setallData}
            generateFor={props.generateFor}
            fillFor={props.fillFor}
            handleDelete={props.handleDelete}
            index={index}
            MoveDown={props.MoveDown}
            MoveUp={props.MoveUp}
            MoveDownSG={handleMoveRowDownSectionGeneration}
            MoveUpSG={handleMoveRowUpSectionGeneration}
          ></GenerateRow>
        </div>
      ))}
      {props["comments"] !== undefined &&
        props["comments"][props.section.sectionName] !== undefined &&
        sessionStorage.getItem("userType") === "Vendor" && (
          <div>
            <br></br>
            Approver Feedback:
            <p style={{ color: "red" }}>
              {props["comments"][props.section.sectionName]}
            </p>
          </div>
        )}
    </div>
  );
}

export default GenerateSection;
