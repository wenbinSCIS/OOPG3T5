import React, { useState } from 'react';
import Checkbox from './Checkbox';
import Dropdown from './DropdownSelect';
import Textarea from './Textarea';
import TextInput from './TextInput';

function GenerateRow(props) {
    var to_return = []
    var all_info = props.info
    var false_header=false
    for(let i=0;i<all_info.length;i++){
        var element = all_info[i]
        var inputType = element["elementType"]
        if("size" in element){
            var dimensions = parseInt(element["size"])
        }
        else{
            var dimensions = 12 /all_info.length
        }
        
        if(inputType=="Textinput"){
            if(i>0 && all_info[0]["elementHeader"].length>0){
                var false_header = true
            }
            to_return.push( <TextInput title={element["elementHeader"]} hint={element["placeholder"]} hintPosition={element["placeholderPosition"]} size={dimensions} name = {element["elementName"]} false_header={false_header}></TextInput>)
        }
        else if(inputType=="Dropdown"){
            if(i>0 && all_info[0]["elementHeader"].length>0){
                var false_header = true
            }
            to_return.push(<Dropdown title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} false_header={false_header}></Dropdown>)
            
        }
        else if(inputType=="Checkbox"){
            if(i>0 && all_info[0]["elementHeader"].length>0){
                var false_header = true
            }
            to_return.push(<Checkbox title={element["elementHeader"]} options={element["options"]} size={dimensions} name = {element["elementName"]} false_header={false_header}></Checkbox>)
            
        }
        else if(inputType="Textarea"){
            if(i>0 && all_info[0]["elementHeader"].length>0){
                var false_header = true
            }
            to_return.push( <Textarea title={element["elementHeader"]} hint={element["placeholder"]} hintPosition={element["placeholderPosition"]} size={dimensions} name = {element["elementName"]} false_header={false_header}></Textarea>)
            
        }
    }
    console.log(to_return)
    return (
        <div className='row'>
            {to_return}
        </div>
        
    );
  }
  
  export default GenerateRow;