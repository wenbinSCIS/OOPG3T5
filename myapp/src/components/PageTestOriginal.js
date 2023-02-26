import React from 'react';
import GenerateRow from './RowGeneration';

export default function TestPage() {

  return (
    <div className="container">
      <GenerateRow 
      columns={2}
      inputType = {'Textinput'}
      details = {[['Full Name',"First Name"],["","Last Name"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={1}
      inputType = {'Textinput'}
      details = {[['Address',"Street Address"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={1}
      inputType = {'Textinput'}
      details = {[['',"Street Address Line 2"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={2}
      inputType = {'Textinput'}
      details = {[["","city"],["","State / Province"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={1}
      size = {4}
      inputType = {'Textinput'}
      details = {[["Phone Number","+65"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={1}
      size = {4}
      inputType = {'Textinput'}
      details = {[["Email Address","ex: email@yahoo.com"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={1}
      size = {4}
      inputType = {'Dropdown'}
      details = {[{title:'How did you hear about us?*',options:["Selection A","Selection B","Selection C"]}]}
      >
      </GenerateRow>
      <GenerateRow 
      columns={1}
      inputType = {'Textarea'}
      details = {[['Feedback About us:',""]]}
      ></GenerateRow>
      <GenerateRow 
      columns={1}
      inputType = {'Textarea'}
      details = {[['Suggestions if any for further improvement:',""]]}
      ></GenerateRow>
      <GenerateRow
      columns={1}
      size = {4}
      inputType = {'Checkbox'}
      details = {[{title:'Will you be willing to recommend us?', options:["Yes","Maybe","No"]}]}
      >
      </GenerateRow>
      <GenerateRow
      columns={1}
      inputType = {'Checkbox'}
      details = {[{title:'', options:["I agree to the Terms of Service and Privacy Policy. I have read the KVKK Clarification Text and I accept the processing of my personal data in accordance with the Explicit Consent Text."]}]}
      >
      </GenerateRow>
    </div>
    
  );
}
