import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Login from './Login';
//DESIGN
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export class LeaderForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      openLogin: false,
      skills: [],
      squadCount: 0,
      members: []
    }
    this.updateSkills = this.updateSkills.bind(this)
    this.updateCount = this.updateCount.bind(this)
    this.updateMembers = this.updateMembers.bind(this)
    this.toggleLogin = this.toggleLogin.bind(this)
  }

  updateSkills(str){
    let skillsArr = str.split(",");
    this.setState({skills: skillsArr});
  }

  updateCount(num){
    this.setState({squadCount: num});
  }

  updateMembers(str){
    let membersArr = str.split(",")
    this.setState({members: membersArr});
  }

  toggleLogin(){
    this.setState({openLogin: !this.state.openLogin});
  }

  render(){
    return(
      <div className='form'>
        { this.state.openLogin ?
          <div>
            <h4>Sign into your Squad account</h4>
            <Login />
            <FlatButton label='Jk, I need the other form' onClick={ e=> { e.preventDefault(); this.toggleLogin();}} />
          </div>
         :
          <div>
            <h4>Submit this short form if you're the responsible for creating teams!</h4>
            <div>Used Squad in the past?
              <FlatButton label='Sign In' onClick={ e=> { e.preventDefault(); this.toggleLogin();}} />
            </div>
            <TextField floatingLabelText="What's your first name?" hintText='First Name' /><br />
            <TextField floatingLabelText="Last Name?" hintText='Last Name' /><br />
            <TextField floatingLabelText="What is your email address?" hintText='squadgoals@example.com'/><br />
            <TextField floatingLabelText="What do you want to name your Pod?" hintText="Descriptive group names (Ex: GHA1609, MTV Writing Partners..." fullWidth={true}/><br />
            <TextField floatingLabelText="How many squads do you need?" hintText="Please enter number" /><br />
            <TextField floatingLabelText="What skills do you need on each squad?" hintText="leader, vocal, guitar, drums..." fullWidth={true}/><br />
            <TextField floatingLabelText="What are the email addresses of all members?" hintText="bill@example.com, melinda@example.com..." fullWidth={true}/><br />
          </div>
        }
      </div>
    )
  }
}

export default connect(
  null,
  null
)(LeaderForm)
