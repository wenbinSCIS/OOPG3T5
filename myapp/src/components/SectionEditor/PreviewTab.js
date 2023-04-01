import React, { useState } from "react";
import GenerateSection from "../SectionGeneration";

export default function PreviewTab({ sectionState, handleDelete }) {
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
          <div>
            <GenerateSection
              section={sectionState}
              allData={allData}
              setallData={setallData}
              generateFor="AdminCreation"
              handleDelete={handleDelete}
            ></GenerateSection>
          </div>
        )}
    </div>
  );
}
