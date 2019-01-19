import React from 'react';
import TaskList from '../../components/task_list';

export default (props) => {

	return (
		<div className='container' style={ { marginTop: '40px' } }>
			<div className='row'>
				<h1>React TODO LIST: List of Archived Reminders</h1>
			</div>
			<br />
			<div className='row'>
				<TaskList archive />
			</div>
		</div>
	);
};
