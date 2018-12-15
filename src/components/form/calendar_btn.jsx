import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const CalendarBtn = (props) => {

	return (
		<div onClick={ props.onclick } className='input-group-prepend'>
      <span
	      style={ {cursor: 'pointer !important' } }
	      className='input-group-text'
      >
	      <i className='fa fa-calendar' />
      </span>
		</div>
	);
};

export default React.memo(CalendarBtn);

CalendarBtn.propTypes = {
	onclick: PropTypes.func, // обработчик события

};