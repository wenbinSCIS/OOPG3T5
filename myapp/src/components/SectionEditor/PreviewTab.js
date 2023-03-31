import React, {useState} from 'react';
import GenerateSection from '../SectionGeneration';

export default function PreviewTab({sectionState, handleDelete}) {
  console.log(sectionState)
  var [allData, setallData] = useState({}); //All data to save for user
  return (
    <div>
      <h5>Preview Tab</h5>
      {typeof sectionState.rowElements === "undefined" && (
        <p>The Section is currently Empty</p>
      )}
      {typeof sectionState.rowElements !== "undefined" && (
        <div>
          <GenerateSection
          section={sectionState}
          allData={allData}
          setallData={setallData}
          generateFor = "Admin"
          handleDelete = {handleDelete}
          ></GenerateSection>
        </div>
        
      )}
    </div>
  );
}
