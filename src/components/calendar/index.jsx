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

	handleClickDate = (newDateToOperate, choosen = false) => {
		const stateObj = { calendarDate: newDateToOperate };
		if (choosen) {
			stateObj.calendarChosen = newDateToOperate;
		}
		this.setState({ ...stateObj });
	};

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
						/>
						</tbody>
					</table>
					<hr />
						<div className='btn-group'>
							<input
								type='button'
								onClick={ null  /*'hideCalendar(event)'*/ }
								value='Закрыть'
				        className='btn btn-sm btn-outline-secondary'
							/>
						</div>
				</div>);
		}
	}