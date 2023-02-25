import rowElementsReact, { useState } from 'react';
import GenerateRow from './RowGeneration';

function GenerateSection(props) {
    
    const rows = props['section']["numRows"]
    const rowElements = props['section']["rowElements"]
    const to_return = []
    var sectionText = props['section']['sectionText']
    for(let i=0;i<rows;i++){
        var curr_row = rowElements[i]
        to_return.push(<GenerateRow info = {curr_row}></GenerateRow>)
    }
    return (
        <div className='row mb-3'>
            <h5>{sectionText}</h5>
            {to_return}
        </div>
        
    );
  }
  
  export default GenerateSection;