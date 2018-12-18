import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TaskNameInput from '../form/task_name_input';
import UrgentInput from '../form/urgent_input';
import Button from '../form/button';
import { clearErr, fireErr, rnd,insertErrInBox } from '../../lib/fn';

export class TaskForm extends Component {
	static propTypes = {
		handleAdd: PropTypes.func, // метод добавления напоминания  в список
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
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
		// проверку данных на валидность
		//  если что-то введено неверно, тогда вывод ошибки в консоль
		// если все ОК, тогда формируем объект {...} и передаем его в this.props.handleAdd(...);
		// ресет компонента формы (т.е. удаление всех данных из инпутов)
	// fireErr(this, 'поле', 'сообщение об ошибке')
		const { taskName, remindDt, urgent = false } = this.state.data;
		let notSuccessValues = false;
		const errBox = {};

		if (!taskName  || !taskName.length) {
			console.log('IN Add Local NAME');
			//fireErr(this, 'taskName', 'Это поле является обязательным для ввода');
			errBox.taskName = 'Это поле является обязательным для ввода';

			notSuccessValues = true;
		}
		console.log('IN Add Local NAME', remindDt );
		if (!remindDt  || !remindDt.length) {
			//fireErr(this, 'remindDt', 'Это поле является обязательным для ввода');
			errBox.remindDt = 'Это поле является обязательным для ввода';

			notSuccessValues = true;
		}
		console.log('IN Add Local', notSuccessValues);
		if (notSuccessValues) {
			fireErr(this, errBox);
			return false;
		}

		this.props.handleAdd(	{
			id: rnd(0, 1000000),
			title: taskName,
			date: remindDt,
			urgent: urgent,
		});

		this.handleClearForm();
	};

	handleClearForm = () => {
		clearErr(this);
		this.setState({ data: {} });
	}

	handleClickAdd = (e) => {
		this.handleAddLocal();
	}

	calendarClick = (e) => {
		console.log(e);
		return null;
	};

	render() {
		const tmp= this.state.data.taskName || '';
		console.log('RND = ', this.state.data, tmp);
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
					/>
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