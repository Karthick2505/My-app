import './Form.css';
import React, { Component } from 'react';  

class Form extends Component {
constructor(props) {
    super(props);
    this.state = {name: '',lname:'',email:'',formsubmit:false};
    this.handlename = this.handlename.bind(this);
    this.handlelname = this.handlelname.bind(this);
    this.handleemail = this.handleemail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlename(event) {
    this.setState({name: event.target.value});
  }
  handlelname(event){
    this.setState({lname: event.target.value});
  }
  handleemail(event){
    this.setState({email: event.target.value});
  }
  handleSubmit(event){ 
    var myJSON = JSON.stringify(this.state);
    this.setState({formsubmit:true})
    alert(myJSON);
  }
      
      
  render() {
    return (<div >
    <form class="form " >
          <div class="title">Welcome</div>
            <div class="input-container ic1">
              <label for="firstname" class="placeholder">First name</label>
              <input id="firstname" name={this.state.name} onChange={this.handlename} class="input" type="text"/>
            </div>
            <div class="input-container ic2">
              <label for="lastname" class="placeholder">Last name</label>
              <input id="lastname" class="input" value={this.state.lname} onChange={this.handlelname} type="text" />
            </div>
            <div class="input-container ic2">
              <label for="email" class="placeholder">Email</label>
              <input id="email" class="input" value={this.state.email} onChange={this.handleemail} type="text"  />
            </div>
            <button type="text" onClick={this.handleSubmit}  class="submit">Submit</button>
        </form>
        { 
        }
        
      

        </div>
        
    );
    
  }
}

export default Form;  
