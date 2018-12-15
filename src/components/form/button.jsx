import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
	const {
		name,
		label,
		className = 'light',
		onclick,
	} = props;

	return (
		<button
			name={ name }
			type='button'
			className={ `btn btn-${ className }` }
			onClick={ onclick }
		>
			{ label }
		</button>
	);
};

export default React.memo(Button);

Button.propTypes = {
	name: PropTypes.string, // имя кнопки
	label: PropTypes.string, // текст для кнопки
	className: PropTypes.string, // класс бутстрапа для кнопки
	onclick: PropTypes.func, // обработчик события нажатие на кнопку
};