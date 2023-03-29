import React, { useState , useEffect} from 'react';
import GenerateSection from './SectionGeneration.js';
import Sidebar from "./Sidebar/Sidebar.js";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function VendorAssessmentForm1() {


  //Api calls here
  var response = {
    "formName":"Vendor Assessment",
    "version":1,
    "formTitle":"Quantum Leap Incorporation PTE LTD",
    "titleSize":"20",
    "sections":[
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
          },
        {
            "elementName":"CompanyRegistrationNo",
            "elementHeader":"",
            "placeholder":"Company Registration No:",
            "placeholderPosition":"front", //either hint or under or front 
            "elementType":"Textinput",
        }],
        [
        {
          "elementName": "Like",
          "elementHeader": "Like",
          "elementType": "Radio",
          "size": "12",
          "elementOrientation":"horizontal",
          "options":
          [
            {
              "optionType": "radio",
              "optionName":"Yes",
              "optionValue":"Yes",
            },
            {
              "optionType": "radio",
              "optionName":"No",
              "optionValue":"No",
            },
            {
              "optionType": "radio-text",
              "optionName":"others",
              "optionValue":"Others",
              "textVariables":{
                //textID will inherit radio optionName + "_text" 
                "header":"",
                "hintPosition":"front",
                "hintText":"Please specify",
                // false_header:null,
              }
            }
          ],
    }],
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
    ]},//section 1
    {
      "sectionName":"Evaluation",
      "sectionText":"Evaluation",
      "sectionFont":"12", 
      "numRows":"1",
      "rowElements":[[
        {
          "elementName":"Licenses",
          "elementHeader":"",
          "elementType":"Checkbox",
          "elementOrientation":"horizontal",
          "options":[{
            "optionType": "Checkbox",
            "optionName":"a. Sole proprietorship",
            "optionValue":"a. Sole proprietorship",
          },    
          {
            "optionType": "Checkbox",
            "optionName":"b. Limited Company",
            "optionValue":"b. Limited Company",
          },
          {
            "optionType": "Checkbox",
            "optionName":"c. Partnership Agreement",
            "optionValue":"c. Partnership Agreement",
          },
          {
            "optionType": "Checkbox-text",
            "optionName":"others",
            "optionValue":"Others",
            "textVariables":{
              //textname will inherit radio optionName + "_text" 
              "header":"",
              "hintPosition":"front",
             " hintText":"Please specify"
            }
          }],
        }]]    
    },// section 2 done
    {
      "sectionName":"Evaluation",
      "sectionText":"Evaluation",
      "sectionFont":"12", 
      "numRows":"1",
      "rowElements":[[
        {
          "elementName":"Feedback",
          "elementHeader":"Feedback About us:",
          "elementType":"Textarea"
      }
        ]]    
    },// section 3 done
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
    ]},// section 4 table
    {
    "sectionName":"Contact Information",
      "sectionText":"Contact Person:",
      "sectionFont":"12", 
      "numRows":"1",
      "rowElements":[[{
        "elementName":"How",
        "elementHeader":"How did you hear about us?*",
        "elementType":"Dropdown",
        "size":"4",
        "options":["Selection A","Selection B","Selection C"]
    }]]
    
  }
  ]
  }




var test = {
  "formName":"Vendor Assessment",
  "version":1,
  "formTitle":"Quantum Leap Incorporation PTE LTD",
  "titleSize":"20",
  "sections":[
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
            "placeholderPosition":"front", 
            "elementType":"Textinput"
        },
      {
          "elementName":"CompanyRegistrationNo",
          "elementHeader":"",
          "placeholder":"Company Registration No:",
          "placeholderPosition":"front", 
          "elementType":"Textinput"
      }],
      [
      {
        "elementName": "Like",
        "elementHeader": "Like",
        "elementType": "Radio",
        "size": "12",
        "elementOrientation":"horizontal",
        "options":
        [
          {
            "optionType": "radio",
            "optionName":"Yes",
            "optionValue":"Yes"
          },
          {
            "optionType": "radio",
            "optionName":"No",
            "optionValue":"No"
          },
          {
            "optionType": "radio-text",
            "optionName":"others",
            "optionValue":"Others",
            "textVariables":{
              "header":"",
              "hintPosition":"front",
              "hintText":"Please specify"
            }
          }
        ]
  }],
  [
    {
        "elementName":"OfficeAddress",
        "elementHeader":"",
        "placeholder":"Office Address: ",
        "placeholderPosition":"front", 
        "elementType":"Textinput"
    }
],
[
  {
      "elementName":"Telephone",
      "elementHeader":"",
      "placeholder":"Tel: ",
      "placeholderPosition":"front",  
      "elementType":"Textinput"
  },
  {
    "elementName":"Fax",
    "elementHeader":"",
    "placeholder":"Fax: ",
    "placeholderPosition":"front",  
    "elementType":"Textinput"
}
]
  ]},
  {
    "sectionName":"Evaluation",
    "sectionText":"Evaluation",
    "sectionFont":"12", 
    "numRows":"1",
    "rowElements":[[
      {
        "elementName":"Licenses",
        "elementHeader":"",
        "elementType":"Checkbox",
        "elementOrientation":"horizontal",
        "options":[{
          "optionType": "Checkbox",
          "optionName":"a. Sole proprietorship",
          "optionValue":"a. Sole proprietorship"
        },    
        {
          "optionType": "Checkbox",
          "optionName":"b. Limited Company",
          "optionValue":"b. Limited Company"
        },
        {
          "optionType": "Checkbox",
          "optionName":"c. Partnership Agreement",
          "optionValue":"c. Partnership Agreement"
        },
        {
          "optionType": "Checkbox-text",
          "optionName":"others",
          "optionValue":"Others",
          "textVariables":{
            "header":"",
            "hintPosition":"front",
           " hintText":"Please specify"
          }
        }]
      }]]    
  },
  {
    "sectionName":"Evaluation",
    "sectionText":"Evaluation",
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
          "headers":["Name","Tel","Designation"]
      }
    ]
  ]},
  {
  "sectionName":"Contact Information",
    "sectionText":"Contact Person:",
    "sectionFont":"12", 
    "numRows":"1",
    "rowElements":[[{
      "elementName":"How",
      "elementHeader":"How did you hear about us?*",
      "elementType":"Dropdown",
      "size":"4",
      "options":[{
        "optionType": "Dropdown",
        "optionName":"Selection A",
        "optionValue":"Selection A"
      },{
        "optionType": "Dropdown",
        "optionName":"Selection B",
        "optionValue":"Selection B"
      },
      {
        "optionType": "Dropdown",
        "optionName":"Selection C",
        "optionValue":"Selection C"
      },
    ]
  }]]
}
]
}





  var [allData , setallData] = useState({}); //All data to save for user
  var [isLoaded , setIsLoaded] = useState(false);

  var formName = "VendorAssessment" //Get from session storage instead

var [formData, setFormData] = useState(null);

   useEffect(() => {
    const fetchFormData = async () => {
      console.log('here')
      const response = await axios.get('http://localhost:8080/api/getFormByName/VendorAssessment');
      setFormData(response.data);
    };
    fetchFormData();
  }, []); 

  console.log(formData)

  
   useEffect(() => {
    loadUserInput("testFormName2", 1, "testUsername1");
  }, []); // empty dependency array to run the effect only once
  async function loadUserInput(formName, formVersion, username){
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
    }
    await axios
      .post(`http://localhost:8080/formInput/getFormInputByFormNameUsernameFormVersion`, inputJson)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200){ 
          setallData(response.data.formInputData[0]) 
          setIsLoaded(true);
        }
      });
    return null
  } 
/*   var dummySaveData =  //this object will be called from API
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
setallData(dummySaveData) // use instead this if db not setup   */ 

  
  async function saveUserInput(formName, formVersion, username){
    var inputJson = {
      "formName":formName,
      "username":username,
      "formVersion":formVersion,
      "formInputData": [allData]
    }
    console.log('isLoaded', isLoaded)
    if (!isLoaded){
      await axios
      .post(`http://localhost:8080/formInput/createFormInput`, inputJson)
      .then((response) => {
        console.log(response.data);
      });
    }else{
      await axios
      .put(`http://localhost:8080/formInput/updateFormInputData`, inputJson)
      .then((response) => {
        console.log(response.data);
      });
    }
  }
  
  console.log(allData)
    const to_return = []

    var sections = formData['sections']
    for(let i=0;i<sections.length;i++){
      const each_section = sections[i]
      to_return.push(<GenerateSection section={each_section} allData = {allData} setallData = {setallData}></GenerateSection>)
    }
  
    return (
      <section className='d-flex'>
        <Sidebar></Sidebar>
      <div className="container">
      {to_return}
      <Button style={{margin: 1 + 'em'}} variant="dark" onClick={()=> saveUserInput("testFormName2", 1, "testUsername1")}>Save</Button>
      <Button variant="dark">Submit Form</Button>
      </div>
      </section>
    );
}
