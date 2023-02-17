import React, { useState } from 'react';
import Dropdown from './DropdownSelect';
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
    if(inputType=="Textinput"){
        for(let i=0;i<props.columns;i++){
            var info = props.details[i]
            to_return.push( <TextInput title={info[0]} hint={info[1]} size={dimensions}></TextInput>)
        }
    }
    else if(inputType=="Dropdown"){
        for(let i=0;i<props.columns;i++){
            var info = props.details[i]
            to_return.push(<Dropdown title={info.title} options={info.options} size={dimensions}></Dropdown>)
        }
    }
    return (
        <div className='row'>
            {to_return}
        </div>
        
    );
  }
  
  export default GenerateRow;