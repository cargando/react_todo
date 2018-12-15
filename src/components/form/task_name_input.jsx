import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextInput from './input';
import CalendarBtn from './calendar_btn';

// export default class TaskNameInput extends PureComponent {  } // STATEFULL / CLASS Component

/* export const TaskNameInput  = React.memo((props) => { // STATELESS / Functioonal COMPONENT
}); */

 const TaskNameInput  = (props) => {
	const {
		value,
		name,
		type,
		className,
		placeholder,
		onChange,
		readOnly,
		label,
		errHint,
		calendarClick,
	} = props;

	const hintTag = errHint && (<small id={ `${ name }Help` } className='form-text text-muted'>{ errHint }</small>);
	// const labelTag = label !== null ? (<label htmlFor='taskData'>{ label }</label>) : null;
	const handleCalendar = (typeof calendarClick === 'function') && calendarClick;

	return (
		<div className='form-group'>
			{
				label && (<label htmlFor={ name }>{ label }</label>)
			}
			<div className='input-group'>
				{
					handleCalendar && (<CalendarBtn onclick={ handleCalendar } />)
				}
				<TextInput
					name={ name }
					type={ type }
					className={ className }
					ariaDescribedby={ `${ name }Help` }
					placeholder={ placeholder }
					value={ value }
					onChange={ onChange }
					readOnly={ readOnly }
				/>
			</div>
			{
				hintTag
			}
		</div>);
};

export default React.memo(TaskNameInput);

TaskNameInput.propTypes =  {
	value: PropTypes.string, // значение инпута по умолчанию
	name: PropTypes.string, // имя компонента
	type: PropTypes.string, // тип инпута (ввод текста, пароля, мыла и пр)
	className: PropTypes.string, // классы для стилизации компонента
	placeholder: PropTypes.string, // плейсхолдер (подсказка)
	onChange: PropTypes.func, // функция обработчик события изменения содержимого инпута
	readOnly: PropTypes.bool, //
	label: PropTypes.string, // текст для тега label
	errHint: PropTypes.string, // текст для подсказки под инпутом
	calendarClick: PropTypes.func, // обработчик события клик по календарю
};