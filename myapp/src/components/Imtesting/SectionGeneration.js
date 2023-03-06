import rowElementsReact, { useState } from 'react';
import GenerateRow from './RowGeneration';

var prop = {'section':{
    "sectionName":"Address",
    "sectionText":"Fill in your address",
    "sectionFont":"12", 
    "numRows":"3",
    "rowElements":[[
        {
            "elementName":"streetAddress1",
            "elementHeader":"Address",
            "placeholder":"Street Address",
            "placeholderPosition":"hint", 
            "elementType":"Textinput",
        }
    ],
    [
      {
          "elementName":"streetAddress2",
          "elementHeader":"",
          "placeholder":"Street Address Line 2",
          "placeholderPosition":"hint", 
          "elementType":"Textinput",
      }
  ],
  [
    {
        "elementName":"city",
        "elementHeader":"",
        "placeholder":"city",
        "placeholderPosition":"hint", 
        "elementType":"Textinput",
    },
    {
      "elementName":"StateProvince",
      "elementHeader":"",
      "placeholder":"State / Province",
      "placeholderPosition":"hint", 
      "elementType":"Textinput",
  }
],
  ]
}}



function GenerateSection(props) {

    const [allData , setallData] = useState({});
    
    const rows = prop['section']["numRows"]
    const rowElements = prop['section']["rowElements"]
    const to_return = []
    var sectionText = prop['section']['sectionText']

    for(let i=0;i<rows;i++){
        var curr_row = rowElements[i]
        to_return.push(<GenerateRow info = {curr_row} Data = {allData} onChange={setallData} ></GenerateRow>)
    }
    return (
        <div className='row mb-3'>
            <h5>{sectionText}</h5>
            {to_return}
        </div>
        
    );
  }
  
  export default GenerateSection;