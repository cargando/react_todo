import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
  	const classForApp = 'ddd';

    return (
      <div className={ classForApp + 'App' }>
	      <br />
        <div className='container'>
	        <div className='row'>
		        <div className='col-md-6' style={ { border: '1px solid red'} }>
			        <h1>TODO List App</h1>

		        </div>
		        <div className='col-md-6' style={ { border: '1px solid green'} }>

			        some text
		        </div>
	        </div>

        </div>
      </div>
    );
  }
}

export default App;
