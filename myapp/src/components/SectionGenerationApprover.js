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
        to_return.push(<GenerateRow info = {curr_row} allData = {allData} setallData={setallData} generateFor = {props.generateFor} fillFor = {props.fillFor}></GenerateRow>)
    }
    return (
        <div className='row mb-3 pt-3'>
            <h5>{sectionText}</h5>
            {to_return}
            { 
            
              props.generateFor === "Approver" &&
                <textarea
                name={props.section.sectionName}
                key={props.section.sectionName}
                className="form-control mx-3"
                placeholder="Write Remarks Here"
                onChange={handleRemarksChange}
                rows="4"
                cols="40"
                style={{width:"90%",
                border: "3px solid #ced4da", 
                marginTop: "10px"}}
              >
                {props.remarks[props.section.sectionName]}
              </textarea>  
            } 


        </div>
        
    );
  }
  
  export default GenerateSectionApproval;