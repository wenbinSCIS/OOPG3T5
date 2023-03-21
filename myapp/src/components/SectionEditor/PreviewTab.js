import React, {useState} from 'react'

export default function PreviewTab({sectionState}) {
  const [sectionComponent, setSectionComponent] = useState(sectionState);
  var [allData, setallData] = useState({}); //All data to save for user
  return (
    <div>
      <h5>Preview Tab</h5>
      {typeof sectionComponent.rowElements === "undefined" && (
        <p>The Section is currenlty Empty</p>
      )}
    </div>
  );
}
