import React, {useState} from 'react';
import GenerateSection from '../SectionGeneration';

export default function PreviewTab(props) {
  const sectionState = props.sectionState;
  var [allData, setallData] = useState({}); //All data to save for user
  return (
    <div>
      <h5>Preview Tab</h5>
      {typeof sectionState.rowElements === "undefined" && (
        <p>The Section is currenlty Empty</p>
      )}
      {typeof sectionState.rowElements !== "undefined" && (
        <GenerateSection
          section={sectionState}
          allData={allData}
          setallData={setallData}
        ></GenerateSection>
      )}
    </div>
  );
}
