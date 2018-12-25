import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import * as appActions from './store/actions';
import { TaskForm } from './components/task_form';
import { TaskList } from './components/task_list';
import {Calendar} from "./components/calendar";


class App extends Component {
	static propTypes = {
		appData: PropTypes.object, // объект со списоком заявок из ридакса
		actUpdateTaskList: PropTypes.func, // функция - action creator по обновлению списка
	};

	constructor(props, context) {
		super(props, context);

		this.handleClearList = this.handleClearList.bind(this);

		this.state = {
			list: [], // this.props.appData.tasks,
			caledarDate: null,
			showCalendar: true,
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
							dataList={ this.props.appData.tasks }
							handleDelete={ this.handleDeleteItem }
							handleClearList={ this.handleClearList }
						/>
			    </div>
			    <div className='row'>
				    <div className='col-md-12'>

				    </div>
			    </div>
		    </div>
	    </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actUpdateTaskList: (payload) => dispatch(appActions.actUpdateTaskList(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);