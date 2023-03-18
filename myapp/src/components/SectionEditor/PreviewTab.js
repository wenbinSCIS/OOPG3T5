import React, {useState} from 'react'

export default function PreviewTab(sectionState) {
  const [sectionComponent, setSectionComponent] = useState(null);
  var [allData, setallData] = useState({}); //All data to save for user
  return (
    <div>
      <h5>Preview Tab</h5>
    </div>
  );
}
