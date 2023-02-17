
import React from 'react';
import TextInput from './TextInput';
import GenerateRow from './RowGeneration';

export default function TestPage() {
  return (
    <div className="container">
      <GenerateRow 
      columns={2}
      inputType = {'Textinput'}
      details = {[['Full Name',"First Name"],[" ","Last Name"]]}
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
      details = {[[' ',"Street Address Line 2"]]}
      >
      </GenerateRow>
      <GenerateRow
      columns={2}
      inputType = {'Textinput'}
      details = {[[" ","city"],[" ","State / Province"]]}
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
    </div>
    
  );
}
