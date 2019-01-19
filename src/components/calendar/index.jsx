import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './calendar.css';
import { CalendarBody } from "./body";
import moment from "moment/moment";
import 'moment/locale/ru';

export class Calendar extends Component {
	static propTypes = {
		calendarDate: PropTypes.object, // объект момент, т.е. дата которой оперирует календарь
		handleAdd: PropTypes.func, // метод добавления напоминания  в список
		handleUpdateDate: PropTypes.func, // метод обновления даты
		handleCloseCalendar: PropTypes.func, // Закрыть календарь
	};

	constructor(props, context) {
		super(props, context);
		moment.locale('ru');

		this.state = {
			calendarDate: moment(),
			calendarChosen: null,
		}
	}

	handleRightClick = () => {
		this.handleClickCalendarArrows('right');
	};

	handleLeftClick = () => {
		this.handleClickCalendarArrows('left');
	};

	handleClickCalendarArrows = (arrow) => {

		this.setState((prevState) => ({
				calendarDate: (arrow === 'right') ? moment(prevState.calendarDate,'DD-MM-YYYY').add('month', 1)
					: moment(prevState.calendarDate,'DD-MM-YYYY').subtract('month', 1),
			}));
	};

	/* метод замены выбранной даты и отображаемого месяца в календаре */
	handleClickDate = (newDateToOperate, choosen = false) => {
		const stateObj = { calendarDate: newDateToOperate };
		if (choosen) {
			stateObj.calendarChosen = newDateToOperate;
		}
		this.setState({ ...stateObj });
	};

	/* метод - вставить выбранную дату в инпут (поле формы) */
	handleClickInsertDate = () => {
			this.props.handleUpdateDate(moment(this.state.calendarChosen).format('DD-MM-YYYY'));
	}

	/* метод - вставить выбранную дату в инпут (поле формы) */
	handleDoubleClickDate = (newDateToOperate, choosen = false) => {
		const stateObj = { calendarDate: newDateToOperate };
		if (choosen) {
			stateObj.calendarChosen = newDateToOperate;
		}
		this.setState({ ...stateObj }, () => {
			this.handleClickInsertDate();
			this.props.handleCloseCalendar();
		});

	}
		render() { // , top: '38px'
		console.log('CALENDAR PROPS = ', this.props);
			return (
				<div id='calendar' className='micalendar' style={ { display: 'block' } }>
					<div className='header_wrap'>
						<div className='header'>
							<p id='monthHeader'>{ this.state.calendarDate.format('MMMM YYYY') }</p>
						</div>
						<div className='arrows'>
							<div onClick={ this.handleLeftClick } className='arrows_left'>
								<i className='fa fa-angle-left' />
							</div>
							<div  onClick={ this.handleRightClick } className='arrows_right'>
								<i className='fa fa-angle-right' />
							</div>
						</div>
					</div>
					<table id='calendar_table'>
						<thead>
						<tr>
							<th>Пн</th>
							<th>Вт</th>
							<th>Ср</th>
							<th>Чт</th>
							<th>Пт</th>
							<th>Сб</th>
							<th>Вс</th>
						</tr>
						</thead>
						<tbody>
						<CalendarBody
							calendarDate={ this.state.calendarDate }
							calendarChosen={ this.state.calendarChosen }
							handleClickDate={ this.handleClickDate }
							handleDoubleClickDate={ this.handleDoubleClickDate }
						/>
						</tbody>
					</table>
					<hr />
						<div className='btn-group'>
							<input
								type='button'
								onClick={ this.handleClickInsertDate }
								value='Вставить'
				        className='btn btn-sm btn-outline-primary'
								disabled={ !this.state.calendarChosen }
								style={ !this.state.calendarChosen ? { cursor: 'not-allowed'} : null }
							/>
						</div>
						<div className='btn-group'>
							<input
								type='button'
								onClick={ this.props.handleCloseCalendar }
								value='Закрыть'
				        className='btn btn-sm btn-outline-secondary'

							/>
						</div>
				</div>);
		}
	}
