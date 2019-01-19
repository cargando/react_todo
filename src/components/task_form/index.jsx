import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskNameInput from '../form/task_name_input';
import UrgentInput from '../form/urgent_input';
import Button from '../form/button';
import { clearErr, fireErr, rnd } from '../../lib/fn';
import moment from "moment/moment";
import { Calendar } from '../calendar';
import * as appActions from '../../store/actions';

class TaskForm extends Component {
	static propTypes = {
		dataList: PropTypes.array, // redux - список задач
		actUpdateTaskList: PropTypes.func, // redux - обновить весь список с напоминаниями
	};

	static defaultProps = {
		dataList: [],
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			showCalendar: false,
			caledarDate: null,
			data: {},
			errState: false, // флаг который указывает о наличии ошибки в компоненте
			errBox: {}, // объект с полями, который хранит ошибки для полей формы
		}
	}

	handleChange = (e) => { // обработчик события - нажатие клавиши
		const { target } = e;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			data: { ...this.state.data, [name]: value },
		});
	};

	handleAddLocal = () => {
		const { taskName, remindDt, urgent = false } = this.state.data;
		let notSuccessValues = false;
		const errBox = {};

		if (!taskName  || !taskName.length) {
			console.log('IN Add Local NAME');
			errBox.taskName = 'Это поле является обязательным для ввода';
			notSuccessValues = true;
		}
		console.log('IN Add Local NAME', remindDt );
		if (!remindDt  || !remindDt.length) {
			errBox.remindDt = 'Это поле является обязательным для ввода';
			notSuccessValues = true;
		}
		console.log('IN Add Local', notSuccessValues);
		if (notSuccessValues) {
			fireErr(this, errBox);
			return false;
		}

		/* this.props.handleAdd(	{
			id: rnd(0, 1000000),
			title: taskName,
			date: remindDt,
			urgent: urgent,
		}); */
		const listCopy = this.props.dataList.slice();
		listCopy.push({
			id: rnd(0, 1000000),
			title: taskName,
			date: remindDt,
			urgent: urgent,
		});

		this.props.actUpdateTaskList(listCopy);

		this.handleClearForm();
	};

	handleClearForm = () => {
		clearErr(this);
		this.setState({ data: {} });
	};

	handleClickAdd = (e) => {
		this.handleAddLocal();
	};

	calendarClick = (e) => {
		const { target } = e;
		console.log('show calendar target = ', target.tagName);
		if (target.tagName === 'INPUT' && this.state.showCalendar) {
			return false;
		}
		this.setState((prevState) =>
			({ showCalendar: !prevState.showCalendar })
		);
	};
	handleUpdateDate = (newDate) => {
		this.setState((prevState) => ({
			data: { ...prevState.data, remindDt: newDate },
		}))
	};

	render() {
		const tmp= this.state.data.taskName || '';
		// console.log('RND = ', this.state.data, tmp);
		return (
			<div className='col-md-6'>
					<TaskNameInput
						value={ tmp  }
						name='taskName'
						placeholder='Название задачи'
						onChange={ this.handleChange }
						label='Введите название задачи'
						errHint={ this.state.errBox.taskName || 'Введите название задачи для напоминания' }
						errState={ !!this.state.errBox.taskName }
					/>
					<TaskNameInput
						value={ this.state.data.remindDt || '' }
						name='remindDt'
						placeholder='Напомнить'
						calendarClick={ this.calendarClick }
						onChange={ this.handleChange  }
						label='Когда напомнить'
						errHint={ this.state.errBox.remindDt || 'Введите дату и время напоминания' }
						errState={ !!this.state.errBox.remindDt }
					>
				{
					this.state.showCalendar && (
						<Calendar
							handleUpdateDate={ this.handleUpdateDate }
							handleCloseCalendar={ () => { this.setState({ showCalendar: false }); } }
						/>
					)
				}
					</TaskNameInput>

					<UrgentInput
						name='urgent'
						label='Отметить как важная'
						checked={ this.state.data.urgent || false }
						onChange={ this.handleChange }
					/>
					<Button
						label='Add task'
						className='primary'
						onclick={ this.handleClickAdd }
					/>
					<Button
						label='Clear Form'
						onclick={ this.handleClearForm }
					/>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	dataList: state.appData.tasks,
});

const mapDispatchToProps = dispatch => ({
	actUpdateTaskList: (payload) => dispatch(appActions.actUpdateTaskList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
