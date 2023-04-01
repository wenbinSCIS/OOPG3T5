import rowElementsReact, { useState } from 'react';
import GenerateRow from './RowGeneration';




function GenerateSection(props) {

    var allData = props.allData //useState prop from main
    var setallData = props.setallData //setState prop from main

   
    const rows = props['section']["numRows"]
    const rowElements = props['section']["rowElements"]
    const to_return = []
    var sectionText = props['section']['sectionText']

    for(let i=0;i<rows;i++){
        var curr_row = rowElements[i]
        to_return.push(<GenerateRow info = {curr_row} allData = {allData} setallData={setallData} generateFor = {props.fillFor == "Vendor" ? "Vendor": props.generateFor} handleDelete = {props.handleDelete}  ></GenerateRow>)
        
    }
    return (
        <div className='row mb-3' >
            <h5>{sectionText}</h5>
            {to_return}
            { 
                props['comments']!==undefined && props['comments'][props.section.sectionName] !== undefined &&
                <div>
                    <br></br>
                    Approver Feedback:<p style={{color:"red"}}>{props['comments'][props.section.sectionName]}</p>
                </div>
                
            } 
        </div>
    );
  }
  
  export default GenerateSection;