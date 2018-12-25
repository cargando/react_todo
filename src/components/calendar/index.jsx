import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './calendar.css';
import { CalendarBody } from "./body";
import moment from "moment/moment";
import 'moment/locale/ru';

export class Calendar extends Component {
	static propTypes = {
		yearToOperate: PropTypes.number, // год, которым оперирует календарь
		monthToOperate: PropTypes.number, // месяц, которым оперирует календарь
		handleAdd: PropTypes.func, // метод добавления напоминания  в список
	};

	constructor(props, context) {
		super(props, context);
		moment.locale('ru');
console.log(moment.locales());
		this.state = {
			calendarDate: moment(),
			calendarChosen: null,
			choosen: null,
		}
	}

	handleRightClick = () => {
		this.handleClickCalendarArrows('right');
	};

	handleLeftClick = () => {
		this.handleClickCalendarArrows('left');
	};

	handleClickCalendarArrows = (arrow) => {
		// console.log('BEFORE: ', STATE);
		/*
		const curMonth = moment(this.state.calendarDate).month(); // получаем номер месяца: который отображается в календаре
		const curYear = moment(this.state.calendarDate).year(); // получаем год: который отображается в календаре
		let monthForSate = 0;
		let yearForState = curYear;
		if (arrow == 'right') { // если нажали кнопку следующий месяц
			monthForSate = curMonth === 11 ? 0 : curMonth + 1; // если месяц декабрь, тогда должны месяц скинуть на январь
			yearForState = curMonth === 11 ? yearForState + 1 : yearForState; // если месяц декабрь, тогда год увеличиваем на 1
		} else {
			monthForSate = curMonth === 0 ? 11 : curMonth - 1; // если месяц январь, тогда должны месяц скинуть на декабрь
			yearForState = curMonth === 0 ? yearForState - 1 : yearForState; // если месяц январь, тогда должны год уменьшить
		}
		const tmpDt = moment().set({ 'year': yearForState, 'month': monthForSate });
		*/
		//console.log('res = ', this.state.calendarDate.subtract(1, 'months'), this.state.calendarDate);
		// console.log('res2 = ', moment().add('month', 1) );
		this.setState((prevState) => ({
				calendarDate: (arrow === 'right') ? moment(prevState.calendarDate,'DD-MM-YYYY').add('month', 1) : moment(prevState.calendarDate,'DD-MM-YYYY').subtract('month', 1),
			}),
			() => { console.log('newVal = ', this.state.calendarDate)});
	};

	handleClickDate = (newDateToOperate, choosen = false) => {
		const stateObj = { calendarDate: newDateToOperate };
		if (choosen) {
			stateObj.calendarChosen = newDateToOperate;
		}
		this.setState({ ...stateObj });
	};

		render() {
		console.log('CALENDAR PROPS = ', this.props);
			return (
				<div id='calendar' className='micalendar' style={ { display: 'block' } }>
					<div className='header_wrap'>
						<div className='header'>
							<p id='monthHeader'>{ this.state.calendarDate.format('MMMM') }</p>
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
								value='Отмена'
				        className='btn btn-sm btn-outline-secondary'
							/>
						</div>
				</div>);
		}
	}