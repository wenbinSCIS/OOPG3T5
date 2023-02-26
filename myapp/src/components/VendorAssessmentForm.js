import React from 'react';
import GenerateRow from './RowGeneration';
import GenerateSection from './SectionGeneration';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
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
      "numRows":"8",
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
      }],
      [
        {
          "elementName":"Product Evaluation",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":['Results of Samples/Product Evaluation: '],
          "additional":{
            "elementName":"Product Results",
            "elementHeader":"",
            "elementType":"Radio",
            "elementOrientation":"horizontal",
            "options":["Satisfactory","Unsatisfactory"]
          }
      }],
      [
        {
          "elementName":"First Deal",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":["Results of First Deal:"],
          "additional":{
            "elementName":"First Deal Results",
            "elementHeader":"",
            "elementType":"Radio",
            "elementOrientation":"horizontal",
            "options":["Satisfactory","Unsatisfactory"]
          }
      }],
      [
        {
          "elementName":"Track Record",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":["Track Record Review/ Customer Reference:"],
          "additional":{
            "elementName":"Track Record Results",
            "elementHeader":"",
            "elementType":"Radio",
            "elementOrientation":"horizontal",
            "options":["Satisfactory","Unsatisfactory"]
          }
      }],
      [
        {
          "elementName":"Others",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":["Others (e.g. commercial, sole supplier, customer specified, franchise etc.)"],
      }]]},
      {
        "sectionName":"Results of Evaluation",
        "sectionText":"Results of Evaluation",
        "sectionFont":"12", 
        "numRows":"1",
        "rowElements":[[
            {
              "elementName":"Approve/Deny",
              "elementHeader":"",
              "elementType":"Checkbox",
              "elementOrientation":"horizontal",
              "options":['Approved',"Not Approved"],
            }
        ]]},
        {
          "sectionName":"Eval and approval",
          "sectionText":"",
          "sectionFont":"12", 
          "numRows":"3",
          "rowElements":[[
            {
              "elementName":"Evalby",
              "elementHeader":"",
              "placeholder":"Evaluated By: ",
              "placeholderPosition":"front", 
              "elementType":"Textinput",
          },
          {
            "elementName":"EvalSignature",
            "elementHeader":"",
            "placeholder":"Signature:",
            "placeholderPosition":"front", 
            "elementType":"Textinput",
        },
          ],[
            {
              "elementName":"Director",
              "elementHeader":"",
              "placeholder":"Approved by Director: ",
              "placeholderPosition":"front", 
              "elementType":"Textinput",
          },
          {
            "elementName":"DirectorSignature",
            "elementHeader":"",
            "placeholder":"Signature:",
            "placeholderPosition":"front", 
            "elementType":"Textinput",
        },
          ],
          [
          {
            "elementName":"Effective Date",
            "elementHeader":"",
            "placeholder":"Effective Date: ",
            "placeholderPosition":"front", 
            "elementType":"Textinput",
            "size":"4"
        },
        ]
        ]},
        
  ]}

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
    <Button variant="dark">Submit Form</Button>
    </div>
    </section>
  );
}
