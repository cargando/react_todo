import React, { Component } from 'react';
import TaskNameInput from './components/form/task_name_input';

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
	calendarClick = (e) => {
		console.log(e);
		return null;
	};

  render() {
    return (
	    <React.Fragment>
		    <div className='container' style={ { marginTop: '40px' } }>
			    <div className='row'>
				    <h1>React TODO LIST</h1>
			    </div>
			    <br />
			    <div className='row'>
				    <div className='col-md-6'>
					    <form id='form1' action=''>
								<TaskNameInput
									value={ this.state.data.taskName }
							    name='taskName'
							    placeholder='Название задачи'
							    onChange={ this.handleChange }
							    label='Введите название задачи'
							    errHint='Введите название задачи для напоминания'
								/>
						    <TaskNameInput
							    value={ this.state.data.remindDt }
							    name='remindDt'
							    placeholder='Напомнить'
							    onChange={ null }
							    label='Когда напомнить'
							    errHint='Введите дату и время напоминания'
							    calendarClick={ this.calendarClick }
							    readOnly
						    />
						    <div className='form-group form-check'>
							    <input
								    type='checkbox'
								    className='form-check-input'
								    id='Check1'
								    value='some data' />
							    <label className='form-check-label' htmlFor='exampleCheck1'>Важно</label>
						    </div>

						    <button type='button' className='btn btn-primary' onClick={ null }>Add task</button>
						    <button type='button' className='btn btn-light' onClick={ null }>Clear Form</button>

					    </form>
				    </div>
				    <div className='col-md-6'>
				      <div className='card' style={ { width: '100%' } }>
					      some data
				      </div>

				    </div>
				    { /* <TasksList listHeader='Список дел на завтра:' /> */ }
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