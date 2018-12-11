import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
	static propTypes = {
		value: PropTypes.string, // значение инпута по умолчанию
		name: PropTypes.string, // имя компонента
		type: PropTypes.string, // тип инпута (ввод текста, пароля, мыла и пр)
		className: PropTypes.string, // классы для стилизации компонента
		placeholder: PropTypes.string, // плейсхолдер (подсказка)
		ariaDescribedBy: PropTypes.string, // значение для подсказки внизу инпута
		onChange: PropTypes.func, // функция обработчик события изменения содержимого инпута
	};

	static defaultProps = { // значение пропсов по умолчанию (если они не переданы в компонент)
		className: 'form-control',
		type: 'text',
	};

	constructor(props, context) {
		super(props, context);

	}

	handleChange = (e) => { // обработчик события - нажатие клавиши
		const { target } = e;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		// if (target.type === 'checkbox') value = target.checked ;
		// else value = target.value;
	};

	render() {
		return (
			<React.Fragment>
				<input
					type={ this.props.type }
					className={ this.props.className }
					id={ this.props.name }
					name={ this.props.name }
					aria-describedby={ this.props.ariaDescribedBy }
					placeholder={ this.props.placeholder }
				/>
			</React.Fragment>
		);
	}
}

/*
TextInput.propTypes =  {
	value: PropTypes.string, // значение инпута по умолчанию
	name: PropTypes.string, // имя компонента
	className: PropTypes.string, // классы для стилизации компонента
	onChange: PropTypes.func, // функция обработчик события изменения содержимого инпута
};
*/
