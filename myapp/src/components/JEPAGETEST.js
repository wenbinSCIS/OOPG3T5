import React from 'react';
import GenerateRow from './RowGeneration';
import GenerateSection from './SectionGeneration';

export default function TestPage() {

    //Api calls here
    var response = {
      "formName":"myform2",
      "sections":[
          {
              "sectionName":"Name",
              "sectionText":"Fill in your name",
              "sectionFont":"12", 
              "numRows":"1",
              "rowElements":[[
                  {
                      "elementName":"firstName",
                      "elementHeader":"Full Name",
                      "placeholder":"First Name",
                      "placeholderPosition":"hint", //either hint or under for now
                      "elementType":"Textinput",
                  },
                  {
                    "elementName":"lastName",
                    "elementHeader":"",
                    "placeholder":"Last Name",
                    "placeholderPosition":"hint",
                    "elementType":"Textinput",
                  }
              ]]
          },
          {
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
        },
        {
          "sectionName":"phoneNumber",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"phoneNumber",
                  "elementHeader":"Phone Number",
                  "placeholder":"+65",
                  "placeholderPosition":"hint", //either hint or under for now
                  "elementType":"Textinput",
                  "size":"4"
              }
          ]]
        },
        {
          "sectionName":"emailAddress",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"emailAddress",
                  "elementHeader":"Email Address",
                  "placeholder":"ex: email@yahoo.com",
                  "placeholderPosition":"hint", //either hint or under for now
                  "elementType":"Textinput",
                  "size":"4"
              }
          ]]
        },
        {
          "sectionName":"How",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"How",
                  "elementHeader":"How did you hear about us?*",
                  "elementType":"Dropdown",
                  "size":"4",
                  "options":["Selection A","Selection B","Selection C"]
              }
          ]]
        },
        {
          "sectionName":"Feedback",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"Feedback",
                  "elementHeader":"Feedback About us:",
                  "elementType":"Textarea"
              }
          ]]
        },
        {
          "sectionName":"Suggestions",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"Suggestions",
                  "elementHeader":"Suggestions if any for further improvement:",
                  "elementType":"Textarea"
              }
          ]]
        },
        {
          "sectionName":"Recommend",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"Recommend",
                  "elementHeader":"Will you be willing to recommend us?",
                  "elementType":"Checkbox",
                  "size":"4",
                  "options":["Yes","Maybe","No"],
              }
          ]]
        },
        {
          "sectionName":"Terms",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"1",
          "rowElements":[[
              {
                  "elementName":"Terms",
                  "elementHeader":"",
                  "elementType":"Checkbox",
                  "options":["I agree to the Terms of Service and Privacy Policy. I have read the KVKK Clarification Text and I accept the processing of my personal data in accordance with the Explicit Consent Text."],
              }
          ]]
        },
          
      ],
      "version": 1.1
  }
  const to_return = []
  var sections = response["sections"]
  for(let i=0;i<sections.length;i++){
    const each_section = sections[i]
    to_return.push(<GenerateSection section={each_section}></GenerateSection>)
  }

  return (
    <div className="container">
      {to_return}
    </div>
    
  );
}
