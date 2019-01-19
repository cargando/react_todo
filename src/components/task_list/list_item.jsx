import React from 'react';
import PropTypes from 'prop-types';
import './list_item.css';

export const ListItem = (props) => {
	const {
		id,
		title,
		archive = false,
		date = null,
		urgent = null,
		deleteClick = null,
		archiveClick = null,
	} = props;
	const simpleItem = (!date && !urgent);

	const urgentTag = urgent && (<React.Fragment>
		<i className='text-danger fa fa-exclamation-triangle' /> &nbsp;
	</React.Fragment>);

	const dateTag = date && (<React.Fragment>
		<br />
		<span className='text-muted'>
			<small> { date } </small>
		</span>
	</React.Fragment>);

	return simpleItem ? (
		<li className='list-group-item'>
			{ title }
		</li>) : (
		<li className='list-group-item'>
			{ urgentTag }
			{ title }
			{ dateTag }
			<span className='archive_ico' onClick={ () => { archiveClick(id) } }>
				<i className={ `fa fa-${ !archive ? 'archive' : 'undo' }`} />
			</span>
			<span className='delete_ico' onClick={ () => { deleteClick(id) } }>
				<i className='fa fa-times' />
			</span>
		</li>);
};

export default React.memo(ListItem);

ListItem.propTypes = {
	id: PropTypes.string, // id  элемента в списке
	title: PropTypes.string, // имя напоминания
	date: PropTypes.string, // дата напоминания
	urgent: PropTypes.bool, // важно / не важно
	onclick: PropTypes.func, // обработчик события нажатие на крестик
};
