import React, { Component } from 'react';
import { TaskForm } from './components/task_form';
import { TaskList } from './components/task_list';
import {Calendar} from "./components/calendar";

const msItems = [
	{
		id: 23,
		title: 'First Item',
		date: '15.12.2018',
	},
	{
		id: 11,
		title: 'Seccond  Item',
		date: '25.12.2018',
	},
	{
		id: 16,
		title: 'One more Item',
		date: '31.12.2018',
		urgent: true,
	},
];

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			list: msItems,
			errState: false,
		}
	}

	handleAddItem = (newItem) => { // обработчик события - нажатие клавиши
		// const list = this.state.list.slice();
		// list.push(newItem);
		// this.setState({ list });
		this.setState(prevState => {
			prevState.list.push(newItem);
			return ({
				list: prevState.list,
			});
		});
	};

	handleDeleteItem = (id) => {
		console.log('>> handleDeleteItem:', id);
		this.setState(prevState => ({
			list: prevState.list
				.filter((item) => (item.id !== id)),
		}),
		);
	};
	handleClearList = () => {
		console.log(' handleClearList')
			this.setState({ list: [] });
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
				    <TaskForm
				      handleAdd={ this.handleAddItem }
				    />
						<TaskList
							dataList={ this.state.list }
							handleDelete={ this.handleDeleteItem }
							handleClearList={ this.handleClearList }
						/>
			    </div>
			    <div className='row'>
				    <div className='col-md-12'>
					    <Calendar />
				    </div>
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