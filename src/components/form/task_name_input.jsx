import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInput from './components/form/input';

// export default class TaskNameInput extends PureComponent {  } // STATEFULL / CLASS Component

/* export const TaskNameInput  = React.memo((props) => { // STATELESS / Functioonal COMPONENT
}); */

export const TaskNameInput  = (props) => {
	const {
		value,
		name,
		type,
		className,
		placeholder,
		ariaDescribedBy = 'taskDataHelp',
		onChange,
		readOnly,
	} = props;

	return (
		<div className='form-group'>
			<label htmlFor='taskData'>Название напоминания</label>
			<TextInput
				name={ name }
				type={ type }
				className={ className }
				ariaDescribedby={ ariaDescribedBy }
				placeholder={ placeholder }
				value={ value }
				onChange={ onChange }
				readOnly={ readOnly }
			/>
			<small id='taskDataHelp' className='form-text text-muted'>Введите название занятия на завтра.</small>
		</div>);
};

export default React.memo(TaskNameInput);

TaskNameInput.propTypes =  {
	value: PropTypes.string, // значение инпута по умолчанию
	name: PropTypes.string, // имя компонента
	type: PropTypes.string, // тип инпута (ввод текста, пароля, мыла и пр)
	className: PropTypes.string, // классы для стилизации компонента
	placeholder: PropTypes.string, // плейсхолдер (подсказка)
	ariaDescribedBy: PropTypes.string, // значение для подсказки внизу инпута
	onChange: PropTypes.func, // функция обработчик события изменения содержимого инпута
	readOnly: PropTypes.bool, //
	lable:
};