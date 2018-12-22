import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './calendar.css';
import { CalendarBody } from "./body";

export class Calendar extends Component {
	static propTypes = {
		yearToOperate: PropTypes.number, // год, которым оперирует календарь
		monthToOperate: PropTypes.number, // месяц, которым оперирует календарь
		handleAdd: PropTypes.func, // метод добавления напоминания  в список
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			calendarMonth: new Date(),
			choosen: null,
		}
	}

		render() {
		console.log('CALENDAR PROPS = ', this.props);
			return (
				<div id='calendar' className='micalendar' style={ { display: 'block' } }>
					<div className='header_wrap'>
						<div className='header'>
							<p id='monthHeader'>Month name</p>
						</div>
						<div className='arrows'>
							<div id='prevButton' className='arrows_left'>
								<i className='fa fa-angle-left' />
							</div>
							<div id='nextButton' className='arrows_right'>
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
							yearToOperate={ this.props.yearToOperate }
							monthToOperate={ this.props.monthToOperate }
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