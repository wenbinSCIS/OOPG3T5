import React from 'react';
import GenerateRow from './RowGeneration';
import GenerateSection from './SectionGeneration';
import Sidebar from "./Sidebar/Sidebar.js";
export default function VendorAssessmentForm() {
    
    //Api calls here
    var response = {
      "formName":"Vendor Assessment",
      "formTitle":"Quantum Leap Incorporation PTE LTD",
      "titleSize":"20",
      "sections":[
        {
          "sectionName":"Subheader",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"2",
          "rowElements":[[
              {
                  "elementName":"formNo",
                  "Text":"Form No.: QLI-QHSP-10-F01",
                  "elementType":"Text",
                  "textSize":"12"
                  // numCols
                  // align
              },
              {
                "elementName":"RevNo",
                "Text":"Rev. No: 00",
                "elementType":"Text",
                "textSize":"12"
              },
              {
                "elementName":"EffectiveDate",
                "Text":"Effective Date:04.04.2022",
                "elementType":"Text",
                "textSize":"12"
              }
          ],[
            {
              "elementName":"FormName",
              "Text":"NEW VENDOR ASSESSMENT FORM",
              "elementType":"Text",
              "textSize":"17",
              "alignment":"center"
            },
          ]
        ]
      },
      {
        "sectionName":"'Company Info'",
        "sectionText":"Fill in your name",
        "sectionFont":"12", 
        "numRows":"4",
        "rowElements":[[
            {
                "elementName":"CompanyName",
                "elementHeader":"",
                "placeholder":"Company's Name: ",
                "placeholderPosition":"front", //either hint or under or front 
                "elementType":"Textinput",
            }
        ],[
          {
              "elementName":"CompanyRegistrationNo",
              "elementHeader":"",
              "placeholder":"Company Registration No:",
              "placeholderPosition":"front", //either hint or under or front 
              "elementType":"Textinput",
          },
          {
            "elementName":"GSTRegister",
            "elementHeader":"GST Registered:",
            "elementType":"Radio",
            "elementOrientation":"horizontal",
            "options":["Yes","No"]
        }
      ],
      [
        {
            "elementName":"OfficeAddress",
            "elementHeader":"",
            "placeholder":"Office Address: ",
            "placeholderPosition":"front", //either hint or under or front 
            "elementType":"Textinput",
        }
    ],
    [
      {
          "elementName":"Telephone",
          "elementHeader":"",
          "placeholder":"Tel: ",
          "placeholderPosition":"front", //either hint or under or front 
          "elementType":"Textinput",
      },
      {
        "elementName":"Fax",
        "elementHeader":"",
        "placeholder":"Fax: ",
        "placeholderPosition":"front", //either hint or under or front 
        "elementType":"Textinput",
    }
  ]
      ]
    },
    {
      "sectionName":"More Information",
      "sectionText":"Type of business License / Registration:",
      "sectionFont":"12", 
      "numRows":"1",
      "rowElements":[[
          {
            "elementName":"Licenses",
            "elementHeader":"",
            "elementType":"Checkbox",
            "elementOrientation":"horizontal",
            "options":["a. Sole proprietorship","b. Limited Company","c. Partnership Agreement",". Others"],
        }
      ]
    ]},
    {
      "sectionName":"Contact Information",
      "sectionText":"Contact Person:",
      "sectionFont":"12", 
      "numRows":"1",
      "rowElements":[[
          {
            "elementName":"Contacts",
            "elementHeader":"",
            "elementType":"Table",
            "noRows":"3",
            "noColumns":"2",
            "headers":["Name","Tel","Designation"],
        }
      ]
    ]},
    {
      "sectionName":"Nature of Business",
      "sectionText":"Nature of Business",
      "sectionFont":"12", 
      "numRows":"1",
      "rowElements":[[
          {
            "elementName":"BusinessTypes",
            "elementHeader":"",
            "elementType":"Checkbox",
            "elementOrientation":"horizontal",
            "options":["Manufacturing","Agent/Dealer","Distributor","Others"],
            "additional":{
              "elementName":"Specify",
              "elementHeader":"",
              "placeholder":"Pls. Specify",
              "placeholderPosition":"front", //either hint or under or front 
              "elementType":"Textinput",
          }
        }
      ]
    ]},
    {
      "sectionName":"Products/Services",
      "sectionText":"Products/Services",
      "sectionFont":"12", 
      "numRows":"2",
      "rowElements":[[
          {
            "elementName":"ProductsandServices",
            "elementHeader":"",
            "elementType":"Textarea"
        }
      ],[
      {
        "elementName":"addLine",
        "Text":"Submit company’s profile, brochure on product/services, if available.",
        "elementType":"Text",
        "textSize":"15",
        "alignment":"left"
    }],
    ]},
    {
      "sectionName":"Evaluation",
      "sectionText":"Evaluation",
      "sectionFont":"12", 
      "numRows":"4",
      "rowElements":[[
        {
          "elementName":"ISO 9001 Certification",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":["ISO 9001 Certification:"],
          "additional":{
            "elementName":"CertBody",
            "elementHeader":"",
            "placeholder":"Certification Body:",
            "placeholderPosition":"front", //either hint or under or front 
            "elementType":"Textinput",
        }
      }],
      [
        {
          "elementName":"Accreditation of Laboratory",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":["Accreditation of Laboratory:"],
          "additional":{
            "elementName":"AccreBody",
            "elementHeader":"",
            "placeholder":"Accreditation Body:",
            "placeholderPosition":"front", //either hint or under or front 
            "elementType":"Textinput",
        }
      }],
      [
        {
          "elementName":"Product Certification",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":["Product Certification:"],
          "additional":{
            "elementName":"Product Markings",
            "elementHeader":"",
            "placeholder":"Product Markings (e.g. PSB, UL, TUV):",
            "placeholderPosition":"front", //either hint or under or front 
            "elementType":"Textinput",
        }
      }],
      [
        {
          "elementName":"Site Evaluation",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":['Site Evaluation Results:'],
          "additional":{
            "elementName":"SiteResults",
            "elementHeader":"",
            "elementType":"Radio",
            "elementOrientation":"horizontal",
            "options":["Satisfactory","Unsatisfactory"]
        }
        
      }]
  ]
    
    
    
    
    
    }
    
  ]}


  




         /*  {
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
                      // numCols
                      // align
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
          
      ], */
      //"version": 1.1

  const to_return = []
  var sections = response["sections"]
  for(let i=0;i<sections.length;i++){
    const each_section = sections[i]
    to_return.push(<GenerateSection section={each_section}></GenerateSection>)
  }

  return (
    <section className='d-flex'>
      <Sidebar></Sidebar>
    <div className="container">
    {to_return}
    </div>
    </section>
  );
}
