import React from 'react';
import TaskForm from '../../components/task_form';

export default (props) => {

	return (
		<div className='container' style={ { marginTop: '40px' } }>
			<div className='row'>
				<h1>React TODO LIST: Add Reminder</h1>
			</div>
			<br />
			<div className='row'>
				<TaskForm />
			</div>
		</div>
	);
};