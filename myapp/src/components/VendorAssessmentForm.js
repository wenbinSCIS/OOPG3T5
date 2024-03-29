import React, { useState , useEffect} from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
export default function VendorAssessmentForm1() {


  //Api calls here
  var response = {
    formName: "Vendor Assessment",
    formTitle: "Quantum Leap Incorporation PTE LTD",
    titleSize: "20",
    sections: [
      {
        sectionName: "'Company Info'",
        sectionText: "Fill in your name",
        sectionFont: "12",
        numRows: "4",
        rowElements: [
          [
            {
              elementName: "CompanyName",
              elementHeader: "",
              placeholder: "Company's Name: ",
              placeholderPosition: "front", //either hint or under or front
              elementType: "Textinput",
            },
            {
              elementName: "CompanyRegistrationNo",
              elementHeader: "",
              placeholder: "Company Registration No:",
              placeholderPosition: "front", //either hint or under or front
              elementType: "Textinput",
            },
          ],
          [
            {
              elementName: "Like",
              elementHeader: "Like",
              elementType: "Radio",
              size: "12",
              elementOrientation: "horizontal",
              options: [
                {
                  optionType: "radio",
                  optionName: "Yes",
                  optionValue: "Yes",
                },
                {
                  optionType: "radio",
                  optionName: "No",
                  optionValue: "No",
                },
                {
                  optionType: "radio-text",
                  optionName: "others",
                  optionValue: "Others",
                  textVariables: {
                    //textID will inherit radio optionName + "_text"
                    header: "",
                    hintPosition: "front",
                    hintText: "Please specify",
                    // false_header:null,
                  },
                },
              ],
            },
          ],
          [
            {
              elementName: "OfficeAddress",
              elementHeader: "",
              placeholder: "Office Address: ",
              placeholderPosition: "front", //either hint or under or front
              elementType: "Textinput",
            },
          ],
          [
            {
              elementName: "Telephone",
              elementHeader: "",
              placeholder: "Tel: ",
              placeholderPosition: "front", //either hint or under or front
              elementType: "Textinput",
            },
            {
              elementName: "Fax",
              elementHeader: "",
              placeholder: "Fax: ",
              placeholderPosition: "front", //either hint or under or front
              elementType: "Textinput",
            },
          ],
        ],
      }, //section 1
      {
        sectionName: "Evaluation",
        sectionText: "Evaluation",
        sectionFont: "12",
        numRows: "1",
        rowElements: [
          [
            {
              elementName: "Licenses",
              elementHeader: "",
              elementType: "Checkbox",
              elementOrientation: "horizontal",
              options: [
                {
                  optionType: "Checkbox",
                  optionName: "a. Sole proprietorship",
                  optionValue: "a. Sole proprietorship",
                },
                {
                  optionType: "Checkbox",
                  optionName: "b. Limited Company",
                  optionValue: "b. Limited Company",
                },
                {
                  optionType: "Checkbox",
                  optionName: "c. Partnership Agreement",
                  optionValue: "c. Partnership Agreement",
                },
                {
                  optionType: "Checkbox-text",
                  optionName: "others",
                  optionValue: "Others",
                  textVariables: {
                    //textname will inherit radio optionName + "_text"
                    header: "",
                    hintPosition: "front",
                    hintText: "Please specify",
                  },
                },
              ],
            },
          ],
        ],
      }, // section 2 done
      {
        sectionName: "Evaluation",
        sectionText: "Evaluation",
        sectionFont: "12",
        numRows: "1",
        rowElements: [
          [
            {
              elementName: "Feedback",
              elementHeader: "Feedback About us:",
              elementType: "Textarea",
            },
          ],
        ],
      }, // section 3 done
      {
        sectionName: "Contact Information",
        sectionText: "Contact Person:",
        sectionFont: "12",
        numRows: "2",
        rowElements: [
          [
            {
              elementName: "Contacts",
              elementHeader: "",
              elementType: "Table",
              noRows: "3",
              noColumns: "2",
              headers: ["Name", "Tel", "Designation"],
            },
          ],
          [
            {
              elementName: "Feedback",
              elementHeader: "Feedback About us:",
              elementType: "Textarea",
            },
          ],
        ],
      }, // section 4 table
      {
        sectionName: "Contact Information",
        sectionText: "Contact Person:",
        sectionFont: "12",
        numRows: "1",
        rowElements: [
          [
            {
              elementName: "How",
              elementHeader: "How did you hear about us?*",
              elementType: "Dropdown",
              size: "4",
              options: ["Selection A", "Selection B", "Selection C"],
            },
          ],
          [
            {
              elementName: "Contacts2",
              elementHeader: "",
              elementType: "Table",
              noRows: "3",
              noColumns: "2",
              headers: ["Name", "Tel", "Designation"],
            },
          ],
        ],
      },
    ],
  };
   var userObject =  //this object will be called from API
  {
    "CompanyName": "Write",
    "CompanyRegistrationNo": "Anything",
    "OfficeAddress": "SMU",
    "Telephone": "123456",
    "Fax": "123123",
    "Contacts": [
        {
            "Name": "123456",
            "Tel": "123"
        },
        {
            "Tel": "123",
            "Designation": "asdadad"
        },
        {
            "Designation": "asdasdad"
        }
    ],
    "How": "Selection B",
    "Like": {
        "name": "Others",
        "type": "radio-text",
        "text": "here as well"
    },
    "Licenses": [
        {
            "name": "b. Limited Company",
            "type": "Checkbox",
            "text": ""
        },
        {
            "name": "Others",
            "type": "Checkbox-text",
            "text": "asdas"
        }
    ],
    "Feedback": "asdasdadad"
}
  var [allData , setallData] = useState({}); //All data to save for user

  if(userObject===undefined){
    var userObject = {}
  }
  useEffect(() => {
    if (userObject !== undefined) {
      setallData(prevData => ({ ...prevData, ...userObject }));
    }
  }, []); // empty dependency array to run the effect only once
  
  
  console.log(allData)
    const to_return = []

    var sections = response['sections']
  
    for(let i=0;i<sections.length;i++){
      const each_section = sections[i]
      to_return.push(<GenerateSection section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
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
