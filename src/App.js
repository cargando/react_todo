import React, { Component } from 'react';
import { TaskForm } from './components/task_form';
import { TaskList } from './components/task_list';

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			data: {},
			errState: false,
		}
	}

	handleChange = (e) => { // обработчик события - нажатие клавиши
		const { target } = e;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		// if (target.type === 'checkbox') value = target.checked ;
		// else value = target.value;
		this.setState({
			data: { ...this.state.data, [name]: value },
		});
/*
		const stateCopy = Object.assign({}, this.state);
		stateCopy.data[name] = value;
		this.setState(stateCopy);
*/
	};


  render() {
  	const ms = '';
  	console.log('ms=', !!ms);
    return (
	    <React.Fragment>
		    <div className='container' style={ { marginTop: '40px' } }>
			    <div className='row'>
				    <h1>React TODO LIST</h1>
			    </div>
			    <br />
			    <div className='row'>
				    <TaskForm />
						<TaskList />
			    </div>
		    </div>
	    </React.Fragment>
    );
  }
}
// sdfsdf
export default App;

/*


 */