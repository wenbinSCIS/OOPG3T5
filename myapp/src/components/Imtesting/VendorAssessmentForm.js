import React, { useState } from 'react';
import GenerateSection from './SectionGeneration';
import Sidebar from "../Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
export default function VendorAssessmentForm1() {
    
    //Api calls here
    var response = {
      "formName":"Vendor Assessment",
      "formTitle":"Quantum Leap Incorporation PTE LTD",
      "titleSize":"20",
      "sections":[
        {
          "sectionName":"Address",
          "sectionText":"Fill in your address",
          "sectionFont":"12", 
          "numRows":"5",
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
              "elementName":"Licenses",
              "elementHeader":"",
              "elementType":"Checkbox",
              "elementOrientation":"horizontal",
              "options":[{
                optionType: "checkbox",
                optionName:"a. Sole proprietorship",
                optionValue:"a. Sole proprietorship",
              },
              {
                optionType: "checkbox",
                optionName:"b. Limited Company",
                optionValue:"b. Limited Company",
              },
              {
                optionType: "checkbox",
                optionName:"c. Partnership Agreement",
                optionValue:"c. Partnership Agreement",
              },
              {
                optionType: "checkbox-text",
                optionName:"others",
                optionValue:"Others",
                textVariables:{
                  //textname will inherit radio optionName + "_text" 
                  header:"",
                  hintPosition:"front",
                  hintText:"Please specify"
                }
              }],
            },
            {
              elementName: "Select",
              elementHeader: "Do you like our service",
              elementType: "Radio",
              size: "4",
              options: //["yes","no","others"]
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
                  }
                }
              ]
            },
          ]
        ]
      }    
  ]}


  const [allData , setallData] = useState({}); //All data to save for user

  const to_return = []
  var sections = response["sections"]
  for(let i=0;i<sections.length;i++){
    const each_section = sections[i]
    to_return.push(<GenerateSection section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
  }

  console.log(allData)
  return (
    <section className='d-flex'>
      <Sidebar></Sidebar>
    <div className="container">
    {to_return}
    <Button variant="dark">Submit Form</Button>
    </div>
    </section>
  );
}
