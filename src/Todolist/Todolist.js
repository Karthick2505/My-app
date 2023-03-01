import React from 'react';
import './Todolist.css';
import Items from './Item'

class TODOLIST extends React.Component {
  constructor(props){
    super(props);
    this.state = { items:[],currentItem:{text:'',},count:0}
    this.submit      = this.submit.bind(this);
    this.changeinInput  = this.changeinInput.bind(this);
    this.deleteItem   = this.deleteItem.bind(this);
    this.chageStatus   = this.chageStatus.bind(this); 
  }

  changeinInput(e){
    this.setState({currentItem:{text: e.target.value,active:true}})
  }
  submit(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      var items = [...this.state.items, newItem];
    this.setState({
      items: items
    })
    }
  }
  deleteItem(id){
    const filteredItems= this.state.items.filter(item =>this.state.items.i !== id);
    this.setState({
      items: filteredItems
    })
    var enabledCount = [].concat(...filteredItems).filter(item => !item.active).length
    this.setState({count:enabledCount})
  }
  chageStatus(id,status){
    const items = this.state.items;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.items[id].active = !status;
    var enabledCount = [].concat(...items).filter(item => !item.active).length
    this.setState({count:enabledCount})
  }
  render(){
  return (
    <div className="main">
        <p>THINGS TO DO:</p>
        
        <Items items={this.state.items} deleteItem={this.deleteItem} chageStatus={this.chageStatus} />

        <p>DONE:{this.state.count}</p>
        <form  onSubmit={this.submit}>
          <input type="text" className="input" placeholder="Add task" value= {this.state.currentItem.text} onChange={this.changeinInput}></input>
          <button className="button" type="submit">Add..</button>
        </form>
    </div>
  );
 }
}


export default TODOLIST;