import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from "moment/moment";
import CalendarCell  from './one_cell';
import { getFirstDayOfMonth, getLastDay } from './fn';
import './calendar.css';

export class CalendarBody extends Component {
	static propTypes = {
		// yearToOperate: PropTypes.number, // год, которым оперирует календарь
		// monthToOperate: PropTypes.number, // месяц, которым оперирует календарь
		calendarDate: PropTypes.object, // дата, которой оперирует календарь
		calendarChosen: PropTypes.object, // дата, которой оперирует календарь
		handleAdd: PropTypes.func, // метод добавления напоминания  в список
		handleClickArrow: PropTypes.func, // кликнули по стрелкам (смена месяца),
		handleClickDate: PropTypes.func, // метод родителя, чтобы поменять занчение в стейте
		handleDoubleClickDate: PropTypes.func, // метод родителя, чтобы поменять занчение в стейте + закрыть календарь
	};

/*	constructor(props, context) {
		super(props, context);
	}
*/

	compareDates = (dt1, dt2) => {
		const obj = { // секунды, минуты, часы, дни
			s: parseInt(moment.duration(dt1.diff(dt2)).asSeconds(), 10),
			m: parseInt(moment.duration(dt1.diff(dt2)).asMinutes(), 10),
			h: parseInt(moment.duration(dt1.diff(dt2)).asHours(), 10),
			d: parseInt(moment.duration(dt1.diff(dt2)).asDays(), 10),
			mm: parseInt(moment.duration(dt1.diff(dt2)).asMonths(), 10),
			y: parseInt(moment.duration(dt1.diff(dt2)).asYears(), 10),
		};
		// console.log('comparision = ', !!(!obj.y && !obj.ymm && !obj.d), obj, dt1.format('DD-MM-YYYY'), dt2.format('DD-MM-YYYY'));
		return !obj.y && !obj.ymm && !obj.d;
	};

	buildCalendar = () => { //
		const { calendarDate } = this.props;
		const yearToOperate = moment(calendarDate).year();
		const monthToOperate = moment(calendarDate).month();
		// console.log('NEW VALs = ', yearToOperate, monthToOperate)
		const dateToOperate = new Date(yearToOperate, monthToOperate);
		const year = dateToOperate.getFullYear();
		const month = dateToOperate.getMonth(); // месяц от 0 до 11, нужно прибавлять 1
		const dayMonth = new Date().getDate(); // какое число месяца
		let dayWeek = dateToOperate.getDay(); // от 0 до 6, причем 0 - это воскресение

		const maximumDaysInPrevMonth = getLastDay(year, month - 1);
		dayWeek = dayWeek === 0 ? 7 : dayWeek;
		const firstDay = getFirstDayOfMonth(year, month);
		let j = 1; // это счетчик недель, которые выводятся в календарь
		let dayCounter = 1;
		let dayCounterAfter = 1;
		let str_out_week = [];

		while (j < 7) {
			let str_out = [];
			for (let i = 1; i < 8; i++) {
				let tmpCellObject = {};
				if ((firstDay.dayWeek > i && j == 1)) { // если меньше чем 1е число текущего месяца - ячейки для предыдущего месяца
					const tmpDayMonth = (maximumDaysInPrevMonth + i + 1 - firstDay.dayWeek);
					tmpCellObject = {
						className: 'not_current',
						dataFullDate: (tmpDayMonth + '.' + (month === 0 ? 12 : month) + '.' + (month === 0 ? yearToOperate - 1 : yearToOperate)),
						dataDayMonth: tmpDayMonth,
					};
				} else if (dayCounter > firstDay.maxDays) { // ячейки для следующего месяца
					tmpCellObject = {
						className: 'not_current',
						dataFullDate: (dayCounterAfter + '.' + (month === 11 ? 1 : month + 2) + '.' + (month == 11 ? yearToOperate + 1 : yearToOperate)),
						dataDayMonth: dayCounterAfter++,
					};

				} else { // ЯЧЕЙКИ для ТЕКУЩЕГО МЕСЯЦА
					let todayClass = '';
					const currrentDt = new Date();

					if (yearToOperate == currrentDt.getFullYear() && monthToOperate == currrentDt.getMonth()) {
						todayClass = dayCounter == dayMonth ? 'today' : '';
					}

					tmpCellObject = {
						className: todayClass,
						dataFullDate: (dayCounter + '.' + (month + 1) + '.' + yearToOperate),
						dataDayMonth: dayCounter++,
					};
				}
				const tmpCellDate = moment(tmpCellObject.dataFullDate, 'DD-MM-YYYY');
				let isChoosen = false;
				if (moment(this.props.calendarChosen).isValid()) {
					isChoosen = this.compareDates(this.props.calendarChosen, tmpCellDate);
				}
				if (isChoosen) {
					tmpCellObject.className = `${ tmpCellObject.className } choosen`;
				}
				str_out.push(<CalendarCell
					key={ `cell_${ j }_${ i }`}
					handleClickCell={ ()=>{
						// console.log('Clicked DT = ', isChoosen, tmpCellDate,  tmpCellDate.isValid());
						this.props.handleClickDate(tmpCellDate, true);
					} }
					handleDoubleClickCell={ () => {
						console.log('Clicked DT = ', isChoosen, tmpCellDate,  tmpCellDate.isValid());
							this.props.handleDoubleClickDate(tmpCellDate, true);
						}
					}
					{ ...tmpCellObject }
				/>);
			} // end of FOR
			str_out_week.push(<tr key={ `row_${ j }` }>{ str_out }</tr>);
			j++;
		} // end OF WHILE
		return str_out_week;
	};

	render() {
		return this.buildCalendar();
	}
}
