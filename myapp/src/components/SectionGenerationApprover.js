import rowElementsReact, { useState } from 'react';
import GenerateRow from './RowGeneration';




function GenerateSectionApproval(props) {

    var allData = props.allData //useState prop from main
    var setallData = props.setallData //setState prop from main

     

    const handleRemarksChange = e => {
        const { name, value } = e.target;
        props.setRemarks(prevRemarks => ({
          ...prevRemarks,
          [name]: value
        }));
      };

   
    const rows = props['section']["numRows"]
    const rowElements = props['section']["rowElements"]
    const to_return = []
    var sectionText = props['section']['sectionText']

 

    for(let i=0;i<rows;i++){
        var curr_row = rowElements[i]
        to_return.push(<GenerateRow info = {curr_row} allData = {allData} setallData={setallData} ></GenerateRow>)
    }
    return (
        <div className='row mb-3'>
            <h5>{sectionText}</h5>
            {to_return}
            <textarea
          name={props.section.sectionName}
          key={props.section.sectionName}
          className="form-control"
          placeholder="Write Remarks Here"
          onChange={handleRemarksChange}
          rows="4"
          cols="50"
        >
        </textarea>
        </div>
        
    );
  }
  
  export default GenerateSectionApproval;