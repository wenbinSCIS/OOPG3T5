import React, { useState } from 'react';
import TextInput from './TextInput';

function GenerateRow(props) {
    const to_return = []

    var inputType = props.inputType
    if(props.size){
        var dimensions = props.size
    }
    else{
        var dimensions = 12/props.columns
    }
    
    var details = props.details

    if(inputType=="Textinput"){
        for(let i=0;i<props.columns;i++){
            var info = details[i]
            to_return.push( <TextInput title={info[0]} hint={info[1]} size={dimensions}></TextInput>)
        }
    }
    return (
        <div className='row'>
            {to_return}
        </div>
        
    );
  }
  
  export default GenerateRow;