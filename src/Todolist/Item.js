import React from 'react';

function ListItems(props){
    const items = props.items;
    const doneitems=(e)=>
    {
        var id = e.target.value;
        var status = e.target.checked
        props.chageStatus(id,status)
    }
    const deleteitems=(e)=>{
        var id = e.target.value;
        props.deleteItem(id)
    }
    const listItems = items.map((item,index) =>
    {
        var checkID = 'check_'+index;
        var classActive = item.active === false ? 'listitem inactive' : 'listitem';
        return <div className={classActive} key={checkID} >
        <div  className='col'><input type="checkbox" id={checkID} name={checkID} value={index}  onChange={doneitems} /></div>
        <div  className='col'><li>{item.text}</li></div>
        <div  className='col'><button className="button"  id={checkID} name={checkID} value={index} onClick={deleteitems} > X</button></div>
        </div>})

    return <div >
        {listItems}
        </div>;
  }

  export default ListItems;