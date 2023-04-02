import React, { useState } from "react";
import GenerateSection from "../SectionGeneration";

export default function PreviewTab({
  sectionState,
  handleDelete,
  MoveUp,
  MoveDown,
}) {
  console.log("in the preview tab the section state is", sectionState);

  var [allData, setallData] = useState({}); //All data to save for user
  return (
    <div>
      <h5>Preview Tab</h5>
      {typeof sectionState.rowElements === "undefined" && (
        <p>The Section is currently Empty</p>
      )}
      {typeof sectionState.rowElements !== "undefined" &&
        sectionState.rowElements.length === 0 && (
          <p>The Section is currently Empty</p>
        )}
      {typeof sectionState.rowElements !== "undefined" &&
        sectionState.rowElements.length !== 0 && (
          <GenerateSection
            section={sectionState}
            allData={allData}
            setallData={setallData}
            generateFor="AdminCreation"
            handleDelete={handleDelete}
            MoveDown={MoveDown}
            MoveUp={MoveUp}
          ></GenerateSection>
        )}
    </div>
  );
}
