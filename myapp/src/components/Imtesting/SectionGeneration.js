import rowElementsReact, { useState } from 'react';
import GenerateRow from './RowGeneration';

var prop = {'section':{
    "sectionName":"Address",
    "sectionText":"Fill in your address",
    "sectionFont":"12", 
    "numRows":"7",
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
    [
        {
            "elementName":"How",
            "elementHeader":"How did you hear about us?*",
            "elementType":"Dropdown",
            "size":"4",
            "options":["Selection A","Selection B","Selection C"]
        }
    ],
    [
        {
          "elementName":"Licenses",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":[{
            optionType: "Checkbox",
            optionName:"a. Sole proprietorship",
            optionValue:"a. Sole proprietorship",
          },    
          {
            optionType: "Checkbox",
            optionName:"b. Limited Company",
            optionValue:"b. Limited Company",
          },
          {
            optionType: "Checkbox",
            optionName:"c. Partnership Agreement",
            optionValue:"c. Partnership Agreement",
          },
          {
            optionType: "Checkbox-text",
            optionName:"others",
            optionValue:"Others",
            textVariables:{
              //textname will inherit radio optionName + "_text" 
              header:"",
              hintPosition:"front",
              hintText:"Please specify"
            }
          }],
        }
    ],
    [
        {
          elementName: "Like",
          elementHeader: "Like",
          elementType: "Radio",
          size: "8",
          "elementOrientation":"horizontal",
          options:
          [
            {
              optionType: "radio",
              optionName:"Yes",
              optionValue:"Yes",
            },
            {
              optionType: "radio",
              optionName:"No",
              optionValue:"No",
            },
            {
              optionType: "radio-text",
              optionName:"others",
              optionValue:"Others",
              textVariables:{
                //textID will inherit radio optionName + "_text" 
                header:"others",
                hintPosition:"front",
                hintText:"Please specify",
                // false_header:null,
              }
            }
          ],
        },
      ],
      [
        {
            "elementName":"Feedback",
            "elementHeader":"Feedback About us:",
            "elementType":"Textarea"
        }
      ]
      
  ]
}}



function GenerateSection(props) {

    var allData = props.allData //useState prop from main
    var setallData = props.setallData //setState prop from main

    
    const rows = prop['section']["numRows"]
    const rowElements = prop['section']["rowElements"]
    const to_return = []
    var sectionText = prop['section']['sectionText']

    for(let i=0;i<rows;i++){
        var curr_row = rowElements[i]
        to_return.push(<GenerateRow info = {curr_row} allData = {allData} setallData={setallData} ></GenerateRow>)
    }
    return (
        <div className='row mb-3'>
            <h5>{sectionText}</h5>
            {to_return}
        </div>
        
    );
  }
  
  export default GenerateSection;