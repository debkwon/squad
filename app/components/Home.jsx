import React, { Component } from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {color: 'white'};

export class Home extends Component {
  render(){
    return (
      <div className='homeStyle'>
        <h3>Group projects don't have to suck.</h3>
        <h1>Let Squad make <br/>🎉 happy teams! 🎉</h1><br/>
        <FlatButton label='Leaders' hoverColor='#813aa5' style={buttonStyle}/>
        <FlatButton label='Members' hoverColor='#813aa5' style={buttonStyle}/>
      </div>
    )
  }
}
export default connect(
  null,
  null
)(Home)
