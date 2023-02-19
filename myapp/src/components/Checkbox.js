import React, { useState } from 'react';

function Checkbox({ options, title,size,false_header,name}) {
  
  const [selectedItems, setSelectedItems] = useState([]);
  const number = `form-group col-md-${size}`

  function handleCheckboxChange(event) {
    const selectedItem = event.target.value;
    const selectedIndex = selectedItems.indexOf(selectedItem);

    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(newSelectedItems);
    }
  }
  return (
    <div className={number} style={{margin:0}} >
      {title.length>0 &&
        <label style={{margin:0,color:'deepskyblue'}}>{title} </label>
      }
      {
        false_header &&
        <br></br>
      }
      {options.map((item,index) => (
        <div key={item}>
        <label> 
          <input
            type="checkbox"
            value={item}
            index={index}
            checked={selectedItems.includes(item)}
            onChange={handleCheckboxChange}
          />
          {" "+item}
        </label>
      </div>
      ))}
    </div>
  );
}
export default Checkbox;