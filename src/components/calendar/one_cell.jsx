import React, {Component} from 'react';
import PropTypes from 'prop-types';

const CalendarCell = (props) => {
	const {
		className = null,
		dataFullDate = null,
		dataDayMonth = null,
		cellText = null,
		handleClickCell,
	} = props;

	if (!className && !dataFullDate && !dataDayMonth ) {
		return <td> &nbsp; </td>;
	}
	return <td
		onClick={ handleClickCell }
		className={ className }
		dataFulldate={ dataFullDate }
		dataDaymonth={ dataDayMonth }
	>
		{ cellText === null ? dataDayMonth : cellText }
	</td>;
};

export default React.memo(CalendarCell);