import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      fields: {},
      errors: {},
      isLoaded: false,
      birthdayResult: ''
    }
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["name"]){
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["name"] = "Only letters";
      }      	
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      this.setState({
        isLoaded: false
      });
    fetch("http://localhost:3001/user/birthday", {
      method: 'post',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(this.state.fields)
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          birthdayResult: result.data
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
      alert("Form submitted");
    }else{
      alert("Form has errors.")
    }

  }

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  render(){
    return (
      <div className="col-sm-6 col-sm-offset-3 padding-4 my-container">        	
        <form name="contactform" className="form-horizontal" onSubmit= {this.contactSubmit.bind(this)}>
          <div className="form-group">
            <label for="inputEmail3" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
                <input ref="name" type="text" className="form-control" size="30" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                <span className="error">{this.state.errors["name"]}</span>
            </div>
          </div>
          <div className="form-group">
            <label for="inputEmail3" className="col-sm-2 control-label">Date of birth</label>
            <div className="col-sm-10">
                <input refs="birth_date" type="date" size="30" className="form-control" placeholder="birth_date" onChange={this.handleChange.bind(this, "birth_date")} value={this.state.fields["birth_date"]}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-lg pro" id="submit" value="Submit">Send Message</button>
              </div>
          </div>
        </form>
        {this.state.isLoaded ? <p className="text-center">{this.state.birthdayResult}</p> : ''};
      </div>
    )
  }
}

export default App;